/**
 * `@mui/x-date-pickers` and `date-fns` are declared OPTIONAL peer dependencies,
 * so a consumer is entitled to skip them. Any module-scope import of either one
 * that is reachable from the package barrel breaks that promise: `import
 * { Button } from '@sistent/sistent'` then throws `Cannot find module` before a
 * single component renders, and the message points at sistent rather than at the
 * peer the consumer chose not to install.
 *
 * This is the regression guard for that class of bug — it is the import graph,
 * not any one component, that has to stay clean. `DateTimePicker` was fixed by
 * deferring to `React.lazy`; `UniversalFilter` was still pulling `date-fns` in
 * eagerly for its quick-range presets.
 */
import fs from 'fs';
import path from 'path';

const SRC = path.resolve(__dirname, '..');
const OPTIONAL_PEERS = ['@mui/x-date-pickers', 'date-fns'];

/**
 * Every form that makes the module resolve at load time, and only those.
 *
 * - `import ... from 'x'` and `require('x')` - the obvious ones.
 * - `import 'x'` - a side-effect import still resolves the module; it binds
 *   nothing, which is exactly why it is easy to miss by eye.
 * - `export ... from 'x'` - a re-export resolves it too, and this is the form
 *   most likely to reintroduce the bug: `src/index.tsx` is built almost
 *   entirely out of `export ... from`, and it is the barrel that turns one
 *   module's import into every consumer's problem.
 *
 * `await import('x')` is deliberately NOT matched - deferring the resolution is
 * the fix, not the defect.
 */
const eagerImportPattern = (specifier: string) => {
  const escaped = specifier.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&');
  // A subpath (`x/sub`) resolves the same package, so it counts.
  const target = String.raw`['"]${escaped}(?:/[^'"]*)?['"]`;

  return new RegExp(
    String.raw`(?:^|[^.\w])(?:` +
      // `import ... from 'x'` / `export ... from 'x'`
      String.raw`(?:import|export)\s[^;]*?from\s*${target}` +
      // `import 'x'` - side-effect only. The absence of `(` is what keeps this
      // from also matching the dynamic `import('x')` above it.
      String.raw`|import\s*${target}` +
      // `require('x')`
      String.raw`|require\s*\(\s*${target}` +
      String.raw`)`,
    'm'
  );
};

const collectSourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === '__testing__' ? [] : collectSourceFiles(full);
    }
    return /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [full] : [];
  });

/**
 * Type-only imports and re-exports are erased by the compiler and never reach
 * the bundle, so they are not what breaks a consumer without the peer
 * installed - `DateTimePicker` legitimately names its props type this way.
 *
 * `export type` is stripped as well as `import type`: the pattern above matches
 * `export ... from`, so without this a perfectly correct type re-export would
 * fail the guard and the only way to satisfy it would be to delete a type.
 */
const stripTypeOnlyStatements = (source: string): string =>
  source.replace(/^\s*(?:import|export)\s+type\s[^;]*;/gm, '');

describe('optional peer dependencies stay out of the eager import graph', () => {
  const sourceFiles = collectSourceFiles(SRC);

  it('finds source files to check', () => {
    expect(sourceFiles.length).toBeGreaterThan(100);
  });

  it.each(OPTIONAL_PEERS)('no module eagerly imports %s', (peer) => {
    const pattern = eagerImportPattern(peer);

    const offenders = sourceFiles.filter((file) =>
      pattern.test(stripTypeOnlyStatements(fs.readFileSync(file, 'utf8')))
    );

    // Listing the paths rather than asserting a count: on failure the message
    // names the exact modules to defer, which is the whole remediation.
    expect(offenders.map((file) => path.relative(SRC, file))).toEqual([]);
  });

  // The scan above is only ever as good as the pattern behind it, and a pattern
  // that quietly stops matching a form reports the same clean result as a
  // codebase that is actually clean. These cases pin the forms it must catch -
  // `export ... from` and the side-effect `import 'x'` were both missed by the
  // first version of this guard, which would have let the barrel reintroduce
  // the exact bug this file exists to prevent.
  describe('the detector itself', () => {
    const flags = (source: string) =>
      eagerImportPattern('date-fns').test(stripTypeOnlyStatements(source));

    it.each([
      ["import { subDays } from 'date-fns';", 'named import'],
      ["import subDays from 'date-fns';", 'default import'],
      ["import 'date-fns';", 'side-effect import, binds nothing'],
      ["import 'date-fns/locale/en-US';", 'side-effect subpath import'],
      ["export { subDays } from 'date-fns';", 're-export'],
      ["export * from 'date-fns';", 'star re-export'],
      ["const { subDays } = require('date-fns');", 'require'],
      ["import { formatDistance } from 'date-fns/formatDistance';", 'subpath import']
    ])('flags %j (%s)', (source) => {
      expect(flags(source)).toBe(true);
    });

    it.each([
      [
        "const { subDays } = await import('date-fns');",
        'dynamic import is the fix, not the defect'
      ],
      ["import type { Duration } from 'date-fns';", 'type-only import is erased'],
      ["export type { Duration } from 'date-fns';", 'type-only re-export is erased'],
      ["import { subtractDays } from '../utils/date.utils';", 'unrelated specifier'],
      ['// mentions date-fns in a comment', 'prose is not an import']
    ])('does not flag %j (%s)', (source) => {
      expect(flags(source)).toBe(false);
    });
  });

  it('keeps the peers marked optional in package.json', () => {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(SRC, '..', 'package.json'), 'utf8')) as {
      peerDependenciesMeta?: Record<string, { optional?: boolean }>;
    };

    for (const peer of OPTIONAL_PEERS) {
      // If a peer stops being optional this test's premise changes and the
      // eager-import assertions above should be revisited, not silently kept.
      expect(pkg.peerDependenciesMeta?.[peer]?.optional).toBe(true);
    }
  });
});
