/**
 * @jest-environment node
 */
/**
 * `dist/index.d.ts` and the runtime bundles must export the same values.
 *
 * Consumers treat the declarations as the answer to "does sistent export this",
 * so the two drifting apart fails in the worst available order. A name declared
 * but not shipped type-checks and then throws at runtime (`HelperTextPopover`
 * and `RenderMarkdownTooltip` did, in 0.22.x); a name shipped but not declared
 * fails to type-check although it works, and pushes every consumer into a local
 * `declare module` shim (130 of them did, `WorkspaceCard` and most of
 * `src/custom/` among them).
 *
 * Both came from one cause: `src/custom/` had an `index.ts` *and* an
 * `index.tsx`, each a different barrel. `import './custom'` resolves by extension
 * order, and the two builds disagree on it - esbuild (the runtime bundle) tries
 * `.tsx` first, TypeScript (the declaration bundle) tries `.ts` first - so each
 * build silently exported a different list. `the source tree` below rules that
 * shape out before it can reach a build; the `dist/` checks catch any other way
 * the two builds come to disagree.
 *
 * Runtime exports are read the way consumers read them: `cjs-module-lexer` is
 * what Node itself uses to expose a CommonJS module's named exports to `import`,
 * and `package.json` points both `main` and `module` at the CommonJS bundle.
 * Declared exports are read with the TypeScript checker, because the bundle
 * re-exports types and values in the same `export { ... }` lists and only the
 * checker can tell them apart - a type-only export correctly has no runtime
 * counterpart.
 */
import { parse as parseCommonJs } from 'cjs-module-lexer';
import fs from 'fs';
import path from 'path';
import ts from 'typescript';

const ROOT = path.resolve(__dirname, '..', '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const DTS = path.join(DIST, 'index.d.ts');
const CJS = path.join(DIST, 'index.js');
const ESM = path.join(DIST, 'index.mjs');

/** Every source file, recursively, as a path relative to `src/`. */
const sourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith('.d.ts')
      ? [path.relative(SRC, full)]
      : [];
  });

/**
 * Module paths that more than one file answers to - `foo.ts` next to
 * `foo.tsx`, which is where the two builds' resolution orders diverge.
 */
const ambiguousModulesIn = (files: string[]): string[] => {
  const byModule = new Map<string, string[]>();
  for (const file of files) {
    const specifier = file.replace(/\.(ts|tsx)$/, '');
    byModule.set(specifier, [...(byModule.get(specifier) ?? []), file]);
  }
  return [...byModule.entries()]
    .filter(([, candidates]) => candidates.length > 1)
    .map(([specifier, candidates]) => `${specifier}: ${candidates.sort().join(', ')}`)
    .sort();
};

/** Exported names of the declaration bundle, split by whether they carry a value. */
const declaredExportsOf = (dtsFile: string): { values: Set<string>; all: Set<string> } => {
  const program = ts.createProgram([dtsFile], {
    noEmit: true,
    skipLibCheck: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX
  });
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(dtsFile);
  const moduleSymbol = source && checker.getSymbolAtLocation(source);
  if (!moduleSymbol) throw new Error(`TypeScript could not load ${dtsFile} as a module`);

  const values = new Set<string>();
  const all = new Set<string>();
  for (const exported of checker.getExportsOfModule(moduleSymbol)) {
    all.add(exported.name);
    const target =
      exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    // An alias that does not resolve (its package is missing) would read as
    // type-only and quietly drop out of the comparison, so it has to fail here.
    if (!target.declarations?.length) {
      throw new Error(`${exported.name} in ${dtsFile} does not resolve to a declaration`);
    }
    if (target.flags & ts.SymbolFlags.Value) values.add(exported.name);
  }
  return { values, all };
};

const commonJsExportsOf = (file: string): Set<string> => {
  const { exports, reexports } = parseCommonJs(fs.readFileSync(file, 'utf8'));
  // A `module.exports = require(...)` re-export hides its names from the lexer,
  // and the comparison would then under-report the runtime surface.
  if (reexports.length) throw new Error(`${file} re-exports ${reexports.join(', ')} opaquely`);
  return new Set(exports.filter((name) => name !== '__esModule'));
};

/**
 * esbuild emits the ESM entry's exports as one trailing `export { a as B, ... }`
 * statement. Requiring exactly one is what keeps this from under-reading: a
 * second export form would otherwise go unnoticed.
 */
const esModuleExportsOf = (file: string): Set<string> => {
  const statements = [...fs.readFileSync(file, 'utf8').matchAll(/\bexport\s*\{([^{}]*)\}/g)];
  if (statements.length !== 1) {
    throw new Error(`${file}: expected one export statement, found ${statements.length}`);
  }
  return new Set(
    statements[0][1]
      .split(',')
      .map((clause) => clause.trim())
      .filter(Boolean)
      .map((clause) => clause.split(/\s+as\s+/).pop() as string)
  );
};

const missingFrom = (expected: Set<string>, actual: Set<string>): string[] =>
  [...expected].filter((name) => !actual.has(name)).sort();

describe('declared and runtime exports agree', () => {
  describe('the source tree', () => {
    it('has no module path answered by both a .ts and a .tsx file', () => {
      // Names each pair, so the failure is the remediation: merge the two
      // files into one and delete the other.
      expect(ambiguousModulesIn(sourceFiles(SRC))).toEqual([]);
    });

    it('detects the shape that caused the drift', () => {
      expect(
        ambiguousModulesIn(['custom/index.ts', 'custom/index.tsx', 'custom/Foo.tsx', 'index.tsx'])
      ).toEqual(['custom/index: custom/index.ts, custom/index.tsx']);
    });
  });

  const built = [DTS, CJS, ESM].every((file) => fs.existsSync(file));

  // Skipping is right for `jest` on its own, before a build. In CI it is not:
  // `node-checks.yml` runs `make build` before `make tests`, so a missing bundle
  // means the build stopped emitting one and every check below would otherwise
  // pass by doing nothing.
  it('has the built bundles to compare when running in CI', () => {
    if (!process.env.CI) return;
    expect(built).toBe(true);
  });

  (built ? describe : describe.skip)('dist/', () => {
    // `describe.skip` still evaluates its body, so these are computed lazily
    // rather than read at collection time.
    let declared: { values: Set<string>; all: Set<string> };
    let commonJs: Set<string>;
    let esModule: Set<string>;

    beforeAll(() => {
      declared = declaredExportsOf(DTS);
      commonJs = commonJsExportsOf(CJS);
      esModule = esModuleExportsOf(ESM);
    }, 120_000);

    it('reads a plausible number of exports from every bundle', () => {
      // Guards the readers themselves: one that quietly stops matching reports
      // the same "nothing missing" as bundles that genuinely agree.
      for (const names of [declared.values, commonJs, esModule]) {
        expect(names.size).toBeGreaterThan(500);
      }
      expect(declared.all.size).toBeGreaterThan(declared.values.size);
    });

    it('ships every value the declarations promise', () => {
      expect(missingFrom(declared.values, commonJs)).toEqual([]);
    });

    it('declares every value the runtime ships', () => {
      expect(missingFrom(commonJs, declared.values)).toEqual([]);
    });

    it('ships the same values from the CommonJS and ES module bundles', () => {
      expect(missingFrom(commonJs, esModule)).toEqual([]);
      expect(missingFrom(esModule, commonJs)).toEqual([]);
    });

    it.each([
      'HelperTextPopover',
      'RenderMarkdownTooltip',
      'L5DeleteIcon',
      'L5EditIcon',
      'TooltipIcon'
    ])('declares and ships %s, which drifted in 0.22.x', (name) => {
      expect(declared.values).toContain(name);
      expect(commonJs).toContain(name);
    });
  });
});
