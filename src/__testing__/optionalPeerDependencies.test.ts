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

/** `import ... from 'x'` / `require('x')`, but NOT `await import('x')`. */
const eagerImportPattern = (specifier: string) =>
  new RegExp(
    String.raw`(?:^|[^.\w])(?:import\s[^;]*?from\s*|require\s*\()\s*['"]${specifier.replace(
      /[/\\^$*+?.()|[\]{}]/g,
      '\\$&'
    )}(?:/[^'"]*)?['"]`,
    'm'
  );

const collectSourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name === '__testing__' ? [] : collectSourceFiles(full);
    }
    return /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [full] : [];
  });

/**
 * Type-only imports are erased by the compiler and never reach the bundle, so
 * they are not what breaks a consumer without the peer installed.
 */
const stripTypeOnlyImports = (source: string): string =>
  source.replace(/^\s*import\s+type\s[^;]*;/gm, '');

describe('optional peer dependencies stay out of the eager import graph', () => {
  const sourceFiles = collectSourceFiles(SRC);

  it('finds source files to check', () => {
    expect(sourceFiles.length).toBeGreaterThan(100);
  });

  it.each(OPTIONAL_PEERS)('no module eagerly imports %s', (peer) => {
    const pattern = eagerImportPattern(peer);

    const offenders = sourceFiles.filter((file) =>
      pattern.test(stripTypeOnlyImports(fs.readFileSync(file, 'utf8')))
    );

    // Listing the paths rather than asserting a count: on failure the message
    // names the exact modules to defer, which is the whole remediation.
    expect(offenders.map((file) => path.relative(SRC, file))).toEqual([]);
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
