/**
 * Everything `dist/index.d.ts` names has to resolve in a *consumer's* tree, not
 * just in this repo's.
 *
 * `tsup` bundles the runtime but leaves the declaration bundle referencing the
 * packages whose types sistent re-exports (`export { Key } from
 * '@meshery/schemas/permissions'`). A `devDependency` satisfies that reference
 * here and nowhere else, so the published package type-checks in CI and then,
 * for a consumer who did not independently install it:
 *
 * - with `skipLibCheck: false`, fails outright with `TS2307: Cannot find module`
 *   pointing at sistent's own `.d.ts`;
 * - with `skipLibCheck: true` - the far more common setting, and what most
 *   frameworks scaffold - degrades the re-exported type to `any` *silently*.
 *
 * The silent case is the dangerous one. `Key` is the permission-key contract
 * behind `permissionKey` on Button, IconButton, MenuItem, ListItem and
 * ListItemButton, plus `PermissionShield`, `PermissionProvider` and
 * `useHasPermission`. When it collapses to `any`, every one of those props stops
 * being checked and nothing anywhere reports it - which is precisely how a
 * mismatch between sistent and the canonical `@meshery/schemas` key set would
 * reach production unnoticed.
 *
 * The rule this pins: a package named by the published declaration bundle must
 * be a real `dependency` or a *non-optional* `peerDependency`. Neither a
 * `devDependency` nor a peer marked optional in `peerDependenciesMeta` is part
 * of what a consumer necessarily installs, so neither can carry a public type -
 * an optional peer that is skipped fails in exactly the two ways above.
 */
import fs from 'fs';
import { builtinModules } from 'module';
import path from 'path';

const ROOT = path.resolve(__dirname, '..', '..');
const DTS = path.join(ROOT, 'dist', 'index.d.ts');

/**
 * Packages the declaration bundle names that are deliberately still undeclared.
 *
 * `@reduxjs/toolkit` and `redux` reach the type surface through
 * `src/actors/*` and `src/redux-persist/*`, which type against the *host's*
 * store. That makes a plain `dependency` wrong (sistent must not own a second
 * store instance) and a required `peerDependency` wrong too (a consumer using
 * only `Button` has no store to bring). Today they resolve for consumers only
 * because `@meshery/schemas` declares `@reduxjs/toolkit` and `react-redux` as
 * required peers and npm installs those - transitive luck, not a contract.
 *
 * The real remedy is to move the redux-facing surface behind its own entry
 * point so the types are opt-in, which is a public-API change and not something
 * to slip into an unrelated fix. Listed here so the exemption is a decision on
 * the record rather than a gap, and so the assertions below still fail the
 * moment a *new* package starts leaking.
 */
const UNDECLARED_BY_DESIGN = ['@reduxjs/toolkit', 'redux'];

/**
 * Packages the declaration bundle names that *are* declared, but only as peers
 * marked optional - so a consumer is entitled to install neither, and the type
 * reference then breaks the same two ways as an undeclared package: `TS2307`
 * under `skipLibCheck: false`, a silent `any` under `skipLibCheck: true`.
 *
 * Kept separate from `UNDECLARED_BY_DESIGN` because the remedy differs: those
 * are missing from `package.json` entirely, these are present and merely
 * optional, and the fix is to stop naming them in the public type surface.
 *
 * - `@mui/x-date-pickers`: a live defect, not a design choice. The barrel does
 *   `export { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker'`,
 *   so a consumer who skips the optional peer silently gets `any` for it. The
 *   real fix is to stop re-exporting that props type from the barrel, tracked in
 *   https://github.com/layer5io/sistent/issues/1749 - exempted here on the
 *   record so this guard can ship without also making a public-API change.
 * - `react`: optional in `package.json`, but every component's props type names
 *   it and always will, and a consumer of a React component library has React.
 *   Same rationale as the `react` / `react-dom` exemption in the sibling
 *   `optionalPeerDependencies.test.ts`.
 */
const OPTIONAL_PEERS_ON_THE_RECORD = ['@mui/x-date-pickers', 'react'];

/**
 * JSDoc in the bundle carries fenced `@example` blocks with real-looking import
 * statements (`import { ability } from '@/utils/can'`), and those are prose, not
 * references a consumer ever resolves. Stripping comments first is what keeps
 * the scan from reporting them.
 */
const stripComments = (source: string): string =>
  source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

/**
 * `from '...'` covers `import`, `export ... from` and `import type`; `import(...)`
 * covers the inline-import form `rollup-plugin-dts` emits for deep references.
 * Both make the module part of what a consumer has to resolve - a declaration
 * file has no lazy form, so unlike the runtime guard in
 * `optionalPeerDependencies.test.ts` there is nothing here to exempt.
 */
const specifiersIn = (source: string): string[] => [
  ...new Set([...source.matchAll(/(?:from|import\()\s*['"]([^'"]+)['"]/g)].map((match) => match[1]))
];

/** `@scope/name/deep/path` -> `@scope/name`; `name/deep/path` -> `name`. */
const packageNameOf = (specifier: string): string =>
  specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];

const isBare = (specifier: string): boolean =>
  !specifier.startsWith('.') && !specifier.startsWith('/');

const externalPackagesIn = (source: string): string[] =>
  [...new Set(specifiersIn(stripComments(source)).filter(isBare).map(packageNameOf))]
    .filter((name) => !builtinModules.includes(name))
    .sort();

type PackageJson = {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  devDependencies?: Record<string, string>;
};

const optionalPeersOf = (pkg: PackageJson): string[] =>
  Object.entries(pkg.peerDependenciesMeta ?? {})
    .filter(([, meta]) => meta?.optional)
    .map(([name]) => name);

/**
 * What a consumer is *guaranteed* to have: dependencies, plus the peers npm
 * installs for them - which excludes every peer marked optional.
 *
 * Read from `peerDependenciesMeta` rather than a hardcoded list, so marking a
 * new peer optional immediately tightens this guard instead of leaving a hole
 * that only shows up in a downstream install.
 */
const installedByConsumersOf = (pkg: PackageJson): string[] => {
  const optional = optionalPeersOf(pkg);

  return [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {})
  ].filter((name) => !optional.includes(name));
};

describe('the published type surface only names packages a consumer installs', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')) as PackageJson;

  const installedByConsumers = installedByConsumersOf(pkg);
  const optionalPeers = optionalPeersOf(pkg);

  const built = fs.existsSync(DTS);

  // A skip is the right outcome for `jest` on its own - the artifact simply is
  // not there yet. In CI it is: `node-checks.yml` runs `make build` before
  // `make tests`, so a missing bundle means the build stopped emitting
  // declarations and this guard would otherwise pass by doing nothing.
  it('has a declaration bundle to inspect when running in CI', () => {
    if (!process.env.CI) return;
    expect(built).toBe(true);
  });

  (built ? describe : describe.skip)('dist/index.d.ts', () => {
    // Read guarded rather than read outright: `describe.skip` still *evaluates*
    // its body, so an unguarded `readFileSync` here throws at collection time
    // and takes the whole suite down with it - turning "no build yet, nothing to
    // check" into a hard failure for anyone running `jest` on its own.
    const referenced = built ? externalPackagesIn(fs.readFileSync(DTS, 'utf8')) : [];

    it('references external packages at all', () => {
      // Guards the scan itself: a pattern that quietly stops matching reports
      // the same clean result as a declaration bundle that is actually clean.
      expect(referenced.length).toBeGreaterThan(5);
    });

    it('names no package that a consumer might not have installed', () => {
      const exempt = [...UNDECLARED_BY_DESIGN, ...OPTIONAL_PEERS_ON_THE_RECORD];

      const undeclared = referenced.filter(
        (name) => !installedByConsumers.includes(name) && !exempt.includes(name)
      );

      // Listing names rather than asserting a count: on failure the message is
      // the remediation - move each one out of devDependencies (or out of
      // optional), or stop re-exporting its types from the barrel.
      expect(undeclared).toEqual([]);
    });

    it('carries the permission-key contract from @meshery/schemas as a real dependency', () => {
      // The specific regression this file was written for. `Key` is re-exported
      // by `src/index.tsx`, so schemas is part of sistent's public API and a
      // devDependency-only declaration cannot express that.
      expect(referenced).toContain('@meshery/schemas');
      expect(Object.keys(pkg.dependencies ?? {})).toContain('@meshery/schemas');
      expect(Object.keys(pkg.devDependencies ?? {})).not.toContain('@meshery/schemas');
    });

    it.each(UNDECLARED_BY_DESIGN)(
      'still needs its %s exemption - delete it here once resolved',
      (name) => {
        // Without this the exemption list would outlive the problem and start
        // hiding a genuine regression under a stale entry.
        expect(referenced).toContain(name);
      }
    );

    it.each(OPTIONAL_PEERS_ON_THE_RECORD)(
      'still needs its %s optional-peer exemption - delete it here once resolved',
      (name) => {
        // Two ways the entry can go stale, and both have to fail loudly: the
        // type surface stops naming it (#1749 lands), or the peer stops being
        // optional - either way the exemption is hiding nothing and must go.
        expect(referenced).toContain(name);
        expect(optionalPeers).toContain(name);
      }
    );
  });

  describe('the detector itself', () => {
    it.each([
      ["export { Key } from '@meshery/schemas/permissions';", ['@meshery/schemas']],
      ["import { Store } from '@reduxjs/toolkit';", ['@reduxjs/toolkit']],
      ["declare const x: import('@mui/material').Theme;", ['@mui/material']],
      ["import type { Duration } from 'date-fns';", ['date-fns']],
      ["export * from 'rxjs';", ['rxjs']],
      ["import { Foo } from './local';", []],
      ["import fs from 'fs';", []]
    ])('reads %j as %j', (source, expected) => {
      expect(externalPackagesIn(source)).toEqual(expected);
    });

    it('ignores imports that only appear inside comments', () => {
      const source = [
        '/**',
        ' * @example',
        " * import { ability } from '@/utils/can';",
        " * import { PermissionProvider } from '@sistent/sistent';",
        ' */',
        "export { Key } from '@meshery/schemas/permissions';"
      ].join('\n');

      expect(externalPackagesIn(source)).toEqual(['@meshery/schemas']);
    });

    // The other half of the comparison, and the one that was wrong first: the
    // scan can name every external package correctly and still pass a leak
    // through if the set it is checked against overstates what a consumer has.
    describe('what counts as installed by a consumer', () => {
      const pkg: PackageJson = {
        dependencies: { rxjs: '^7.8.2' },
        peerDependencies: { '@mui/material': '^9.0.0', '@mui/x-date-pickers': '^9.0.0' },
        peerDependenciesMeta: { '@mui/x-date-pickers': { optional: true } },
        devDependencies: { typescript: '^6.0.3' }
      };

      it('counts dependencies and required peers', () => {
        expect(installedByConsumersOf(pkg)).toEqual(['rxjs', '@mui/material']);
      });

      it('does not count a peer marked optional - a consumer may skip it', () => {
        expect(installedByConsumersOf(pkg)).not.toContain('@mui/x-date-pickers');
      });

      it('does not count a devDependency', () => {
        expect(installedByConsumersOf(pkg)).not.toContain('typescript');
      });

      it('treats a peer with no meta entry as required', () => {
        expect(installedByConsumersOf({ peerDependencies: { react: '^19.0.0' } })).toEqual([
          'react'
        ]);
      });

      it('treats optional: false as required rather than as merely present', () => {
        const explicit: PackageJson = {
          peerDependencies: { react: '^19.0.0' },
          peerDependenciesMeta: { react: { optional: false } }
        };

        expect(installedByConsumersOf(explicit)).toEqual(['react']);
      });
    });
  });
});
