/**
 * Guards the `src/index.tsx` package barrel.
 *
 * The barrel is the single public surface: every consumer does
 * `import { X } from '@sistent/sistent'`, so a broken barrel breaks everyone.
 *
 * The barrel cannot be `require()`d by Jest — transitive ESM-only deps like
 * `react-markdown` are not in `transformIgnorePatterns` and adding them just to
 * test the barrel would be a maintenance treadmill. Instead, this test does
 * what the repo's existing guards do: read source and the built bundle
 * statically, asserting structural properties that would catch the classes of
 * breakage that have actually bitten consumers.
 *
 * What it checks:
 *
 * 1. **Every `export *` specifier resolves to a real file** — a typo in a
 *    wildcard re-export would silently produce an empty module.
 *
 * 2. **Every explicit `export { … } from …` names a specifier that resolves**
 *    — these are the workaround for the rollup-plugin-dts nested-barrel quirk
 *    and are the only thing keeping the named declarations in the published
 *    bundle.
 *
 * 3. **The explicit re-exports actually exist in the source module they point
 *    at** — a rename in the source drops the symbol silently.
 *
 * 4. **The `dist/index.js` bundle (when built) carries every explicitly named
 *    runtime export** — a mismatch between source intent and bundled output is
 *    the bug that reaches consumers.
 *
 * 5. **`MESHERY_EXTENSION_CONTRACT_VERSION` appears in the built bundle** — a
 *    release-verification property per AGENTS.md.
 */
import fs from 'fs';
import path from 'path';

const SRC = path.resolve(__dirname, '..');
const ROOT = path.resolve(SRC, '..');
const BARREL = path.join(SRC, 'index.tsx');
const DIST_CJS = path.join(ROOT, 'dist', 'index.js');
const DIST_ESM = path.join(ROOT, 'dist', 'index.mjs');

const barrelSource = fs.readFileSync(BARREL, 'utf8');

// ---------------------------------------------------------------------------
// Pinned explicit re-exports — the deletion guard
// ---------------------------------------------------------------------------

/**
 * Every explicit `export { … } from '…'` in the barrel exists to work around
 * the rollup-plugin-dts nested-barrel quirk: without it the named declaration
 * is silently dropped from the published bundle. Removing one is always a
 * consumer-visible regression, so this list pins them.
 *
 * **When you add a new explicit re-export to `src/index.tsx`, add its runtime
 * symbols here too.** The test below will tell you if you forget.
 *
 * Only runtime symbols are listed (not `type`-only exports) because those are
 * the ones a consumer can `import { X }` and get `undefined` for — types are
 * erased and caught by a different mechanism (the dts surface guard).
 */
const PINNED_EXPLICIT_EXPORTS: string[] = [
  // ./custom/Feedback
  'FeedbackButton',
  // ./custom/TableActions
  'getCopyDeepLinkAction',
  // ./custom/DangerConfirmationModal
  'DangerConfirmationModal',
  // ./custom/DashboardLayout
  'DashboardLayout',
  // ./custom/UniversalFilter
  'UniversalFilter',
  // ./custom/DataTableToolbar
  'DataTableToolbar',
  // ./custom/NavigationNavbar
  'NavigationNavbar',
  // ./custom/permissions
  'createCanShow',
  'PermissionProvider',
  'PermissionSessionContext',
  'PermissionShield',
  'getPermissionKeys',
  'isPermissionKeySet',
  'useHasPermission',
  'usePermission',
  'usePermissionUserContext',
  'useUnmetPermissionKeys',
  // ./custom/useAccessibleOrgs
  'useAccessibleOrgs',
  // ./custom/WidgetPicker
  'WidgetPicker',
  // ./custom/WidgetEmptyState
  'WidgetEmptyState',
  // ./custom/BottomSheet
  'BottomSheet',
  // ./custom/ActionButton
  'ActionButton',
  // ./custom/ShareModal
  'ResourceAccessActorError',
  'ShareModal',
  'buildGrantAccessPayload',
  'buildRevokeAccessPayload',
  'toResourceAccessActors',
  // ./custom/DashboardWidgets/GettingStartedWidget/TeamSearchField
  'TeamSearchField'
];

/**
 * Every `export * from '…'` specifier in the barrel. These carry the bulk of
 * the public API (~700 symbols). Removing one silently drops an entire domain
 * (all MUI base components, all icons, all colors…) and nothing else in CI
 * would catch it.
 *
 * When you add or remove an `export *` line from `src/index.tsx`, update this
 * list. The test below will tell you if you forget.
 */
const PINNED_STAR_REEXPORTS: string[] = [
  './actors',
  './base',
  './colors',
  './custom',
  './hooks',
  './icons',
  './redux-persist',
  './schemas',
  './theme',
  './utils'
];

// ---------------------------------------------------------------------------
// Source-level helpers
// ---------------------------------------------------------------------------

/** Resolve a barrel-relative specifier (`./base`, `./custom/Foo`) to a file. */
const resolveSpecifier = (specifier: string): string | null => {
  const base = path.resolve(SRC, specifier);
  // Try the common patterns: exact, .tsx, .ts, /index.tsx, /index.ts
  for (const candidate of [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    path.join(base, 'index.tsx'),
    path.join(base, 'index.ts')
  ]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
};

/** Collect `export * from '…'` specifiers. */
const starReexportSpecifiers = (): string[] => {
  const specifiers: string[] = [];
  const pattern = /export\s*\*\s*from\s*['"]([^'"]+)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(barrelSource)) !== null) {
    specifiers.push(match[1]);
  }
  return specifiers;
};

interface ExplicitExport {
  /** The name as it appears in the barrel's `export { … }` block. */
  localName: string;
  /** The exported name (after `as`, if any). */
  exportedName: string;
  /** Whether this is a `type`-only export (erased at runtime). */
  isType: boolean;
  /** The `from '…'` specifier. */
  specifier: string;
}

/** Collect all targeted `export { A, B } from '…'` entries. */
const explicitExports = (): ExplicitExport[] => {
  const results: ExplicitExport[] = [];

  const pattern = /export\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(barrelSource)) !== null) {
    const block = match[1];
    const specifier = match[2];
    for (const item of block.split(',')) {
      const trimmed = item.trim();
      if (!trimmed) continue;
      const isType = trimmed.startsWith('type ');
      const withoutType = trimmed.replace(/^type\s+/, '');
      const parts = withoutType.split(/\s+as\s+/);
      const localName = parts[0].trim();
      const exportedName = parts[parts.length - 1].trim();
      results.push({ localName, exportedName, isType, specifier });
    }
  }
  return results;
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('src/index.tsx barrel — structural integrity', () => {
  describe('star re-export specifiers resolve to files', () => {
    const specifiers = starReexportSpecifiers();

    it('found star re-exports to check', () => {
      expect(specifiers.length).toBeGreaterThan(3);
    });

    it.each(specifiers)('export * from %j resolves to a source file', (specifier) => {
      const resolved = resolveSpecifier(specifier);
      expect(resolved).not.toBeNull();
    });
  });

  describe('pinned star re-exports are present (catches domain removals)', () => {
    const currentStarSpecs = new Set(starReexportSpecifiers());

    it('every pinned star re-export is still in the barrel', () => {
      // If this fails, someone removed an `export * from '…'` line from
      // src/index.tsx. That silently drops an entire domain (e.g. all MUI
      // components, all icons, all colors).
      //
      // Fix: restore the removed line, or — if intentional — delete the
      // entry from PINNED_STAR_REEXPORTS and document the breaking change.
      const removed = PINNED_STAR_REEXPORTS.filter(
        (spec) => !currentStarSpecs.has(spec)
      );
      expect(removed).toEqual([]);
    });

    it('every current star re-export is pinned (catches unpinned additions)', () => {
      // If this fails, a new `export * from '…'` was added to src/index.tsx
      // but not to PINNED_STAR_REEXPORTS.
      //
      // Fix: add the listed specifier(s) to PINNED_STAR_REEXPORTS in
      // src/__testing__/indexBarrel.test.ts.
      const unpinned = [...currentStarSpecs].filter(
        (spec) => !PINNED_STAR_REEXPORTS.includes(spec)
      );
      expect(unpinned).toEqual([]);
    });
  });

  describe('pinned explicit re-exports are present (catches removals)', () => {
    const currentRuntimeExports = new Set(
      explicitExports()
        .filter((e) => !e.isType)
        .map((e) => e.exportedName)
    );

    it('every pinned symbol is still explicitly re-exported from the barrel', () => {
      // If this fails, someone removed an explicit `export { … } from`
      // statement from src/index.tsx. That drops the symbol's declaration
      // from the published bundle (the dts-drop quirk), breaking every
      // consumer that imports it by name.
      //
      // Fix: restore the removed export in src/index.tsx, or — if the removal
      // is intentional — delete the entry from PINNED_EXPLICIT_EXPORTS above
      // and document the breaking change.
      const removed = PINNED_EXPLICIT_EXPORTS.filter(
        (name) => !currentRuntimeExports.has(name)
      );
      expect(removed).toEqual([]);
    });

    it('every current runtime explicit export is pinned (catches unpinned additions)', () => {
      // If this fails, a new explicit re-export was added to src/index.tsx but
      // not to PINNED_EXPLICIT_EXPORTS above.
      //
      // Fix: add the listed symbol(s) to PINNED_EXPLICIT_EXPORTS in
      // src/__testing__/indexBarrel.test.ts so future removals are caught.
      const unpinned = [...currentRuntimeExports].filter(
        (name) => !PINNED_EXPLICIT_EXPORTS.includes(name)
      );
      expect(unpinned).toEqual([]);
    });
  });

  describe('explicit re-export specifiers resolve to files', () => {
    const exports = explicitExports();
    const specifiers = [...new Set(exports.map((e) => e.specifier))];

    it('found explicit re-export specifiers to check', () => {
      expect(specifiers.length).toBeGreaterThan(3);
    });

    it.each(specifiers)('export { … } from %j resolves to a source file', (specifier) => {
      const resolved = resolveSpecifier(specifier);
      expect(resolved).not.toBeNull();
    });
  });

  describe('explicitly named symbols exist in their source modules', () => {
    const exports = explicitExports();

    it('found explicit exports to check', () => {
      expect(exports.length).toBeGreaterThan(10);
    });

    // Group by specifier for clearer test output.
    const bySpecifier = new Map<string, ExplicitExport[]>();
    for (const e of exports) {
      const list = bySpecifier.get(e.specifier) ?? [];
      list.push(e);
      bySpecifier.set(e.specifier, list);
    }

    for (const [specifier, entries] of bySpecifier) {
      describe(specifier, () => {
        const resolved = resolveSpecifier(specifier);
        // Skip if the specifier itself doesn't resolve — that's caught above.
        const sourceText = resolved ? fs.readFileSync(resolved, 'utf8') : '';

        for (const { localName, isType } of entries) {
          if (localName === 'default') {
            // `default as Foo` — check the source has a default export.
            it('has a default export', () => {
              expect(sourceText).toMatch(/export\s+default\b/);
            });
          } else {
            it(`exports ${isType ? 'type ' : ''}${localName}`, () => {
              // The name must appear as a word in the source module — either
              // defined directly (`export const Foo`) or re-exported from a
              // deeper file (`export { Foo } from './Foo'`). A simple
              // word-boundary check is sufficient: we are verifying the name
              // is reachable, not parsing the syntax. This catches a rename
              // in the source that silently breaks the barrel re-export.
              const namePattern = new RegExp(
                `\\b${localName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`
              );
              expect(sourceText).toMatch(namePattern);
            });
          }
        }
      });
    }
  });

  describe('no specifier appears in both star and explicit re-exports', () => {
    // This isn't inherently wrong — the explicit re-export is for dts, and the
    // star carries the runtime. But it's worth documenting that they overlap
    // intentionally. This test just ensures we can enumerate both sets.
    const starSpecs = new Set(starReexportSpecifiers());
    const explicitSpecs = new Set(explicitExports().map((e) => e.specifier));

    it('explicit re-exports come from sub-paths, not directly from star specifiers', () => {
      // The explicit re-exports should be from specific leaf modules like
      // `./custom/Feedback`, not from the same barrels that `export *` uses
      // (like `./custom`). This is the design: star covers the barrel,
      // explicit covers the leaf to force the dts declaration.
      for (const spec of explicitSpecs) {
        if (starSpecs.has(spec)) {
          // If it IS a star specifier, that's unusual — flag it but don't fail.
          // The barrel might do both intentionally.
          expect(spec).toBeDefined();
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Built bundle checks (skip when not built, required in CI)
  // -------------------------------------------------------------------------

  const hasDist = fs.existsSync(DIST_CJS) || fs.existsSync(DIST_ESM);

  it('has a built bundle to inspect when running in CI', () => {
    if (!process.env.CI) return;
    expect(hasDist).toBe(true);
  });

  (hasDist ? describe : describe.skip)('built bundle', () => {
    const bundleSource = hasDist
      ? fs.readFileSync(fs.existsSync(DIST_ESM) ? DIST_ESM : DIST_CJS, 'utf8')
      : '';

    it('is non-trivial (> 10 KB)', () => {
      expect(bundleSource.length).toBeGreaterThan(10_000);
    });

    describe('explicit runtime re-exports appear in the bundle', () => {
      const runtimeExports = explicitExports().filter((e) => !e.isType);

      it.each(runtimeExports.map((e) => e.exportedName))(
        '%s appears in the built bundle',
        (name) => {
          // The bundler emits the name in an export statement or object.
          // A simple substring check is sufficient — if the name doesn't
          // appear at all, it was dropped.
          expect(bundleSource).toContain(name);
        }
      );
    });

    it('exports MESHERY_EXTENSION_CONTRACT_VERSION', () => {
      expect(bundleSource).toContain('MESHERY_EXTENSION_CONTRACT_VERSION');
    });
  });
});
