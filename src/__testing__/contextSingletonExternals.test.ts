/**
 * A package whose API is a React context has to be the *host's* copy, never one
 * bundled into `dist`.
 *
 * `tsup` inlines every `devDependency` a source file imports. For most packages
 * that is harmless, but a context-based library carries its context object with
 * it: the bundled copy calls `React.createContext` again and owns a context the
 * host's provider never writes to. Every hook sistent calls then reads the
 * context default, and nothing throws.
 *
 * That is how `useNotificationHandler` shipped: it calls notistack's
 * `useSnackbar`, notistack was a devDependency, so `dist` carried a private
 * notistack whose default `enqueueSnackbar` is a no-op. `notify(...)` did
 * nothing in every host app, even directly under the host's own
 * `SnackbarProvider`.
 *
 * The rule this pins: each package listed in `HOST_CONTEXT_PACKAGES` is a
 * required (non-optional) `peerDependency` - which `tsup` externalizes on its
 * own - and the built bundles actually import it rather than inline it.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..', '..');
const CJS = path.join(ROOT, 'dist', 'index.js');
const ESM = path.join(ROOT, 'dist', 'index.mjs');

/**
 * Packages sistent uses through a React context that the host provides.
 *
 * Not listed, on the record:
 * - `react-redux` (used by `PersistedStateProvider`) is bundled too, but since
 *   8.1 it keeps its context in a `globalThis` registry keyed by
 *   `Symbol.for('react-redux-context')`, so a bundled copy shares the host's
 *   context by design. It does not have this defect.
 * - `@mui/material`, `react`, `xstate` are already required peers or explicit
 *   `external`s in `tsup.config.ts`.
 */
const HOST_CONTEXT_PACKAGES = ['notistack'];

type PackageJson = {
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
};

const escape = (value: string) => value.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&');

/** `require("x")` - how the CJS bundle loads an external. */
const requiresInCjs = (source: string, name: string): boolean =>
  new RegExp(String.raw`require\(\s*['"]${escape(name)}['"]\s*\)`).test(source);

/** `from "x"` / `import "x"` - how the ESM bundle loads an external. */
const importsInEsm = (source: string, name: string): boolean =>
  new RegExp(String.raw`(?:from|import)\s*['"]${escape(name)}['"]`).test(source);

describe('context-based packages resolve to the host copy', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')) as PackageJson;

  describe.each(HOST_CONTEXT_PACKAGES)('%s', (name) => {
    it('is a required peer dependency', () => {
      expect(pkg.peerDependencies?.[name]).toBeDefined();
      expect(pkg.peerDependenciesMeta?.[name]?.optional ?? false).toBe(false);
    });
  });

  const built = fs.existsSync(CJS) && fs.existsSync(ESM);

  // Same shape as `publishedTypeSurfaceDependencies.test.ts`: a local `jest`
  // with no build skips, but CI builds first (`node-checks.yml`), so a missing
  // bundle there means this guard would pass by checking nothing.
  it('has built bundles to inspect when running in CI', () => {
    if (!process.env.CI) return;
    expect(built).toBe(true);
  });

  (built ? describe : describe.skip)('dist', () => {
    const cjs = built ? fs.readFileSync(CJS, 'utf8') : '';
    const esm = built ? fs.readFileSync(ESM, 'utf8') : '';

    it('recognises an external at all', () => {
      // Guards the patterns: if they stop matching the bundler's output, the
      // assertions below would fail for every package rather than pass silently,
      // but this names the actual cause.
      expect(requiresInCjs(cjs, 'react')).toBe(true);
      expect(importsInEsm(esm, 'react')).toBe(true);
    });

    it.each(HOST_CONTEXT_PACKAGES)('imports %s instead of bundling it', (name) => {
      expect(requiresInCjs(cjs, name)).toBe(true);
      expect(importsInEsm(esm, name)).toBe(true);
    });
  });

  describe('the detector itself', () => {
    it('matches minified and spaced CJS requires', () => {
      expect(requiresInCjs('var a=require("notistack");', 'notistack')).toBe(true);
      expect(requiresInCjs("require( 'notistack' )", 'notistack')).toBe(true);
      expect(requiresInCjs('require("notistack/extra")', 'notistack')).toBe(false);
    });

    it('matches minified and spaced ESM imports', () => {
      expect(importsInEsm('import{useSnackbar as a}from"notistack";', 'notistack')).toBe(true);
      expect(importsInEsm("import { x } from 'notistack';", 'notistack')).toBe(true);
      expect(importsInEsm('import"notistack";', 'notistack')).toBe(true);
      expect(importsInEsm('from"notistack-other"', 'notistack')).toBe(false);
    });
  });
});
