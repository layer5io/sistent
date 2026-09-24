/**
 * Surface-level smoke test for the RJSFFormWrapper / RJSFFormModal
 * exports added in layer5io/sistent#1533.
 *
 * Three assertions:
 *
 * 1. The wrapper module loads cleanly with the @rjsf/* peer-deps
 *    installed (deep-path import).
 *
 * 2. The new symbols are wired through BOTH `src/custom` barrels
 *    (`index.ts` AND `index.tsx`). sistent ships two barrel files
 *    at this path — TypeScript's module resolution prefers `.ts`
 *    over `.tsx`, while tsup's runtime emit reads `.tsx`. If an
 *    export lands in only one of them, runtime and types diverge:
 *    the symbol appears in `dist/index.mjs` but is missing from
 *    `dist/index.d.ts` (or vice versa). The barrel check is done
 *    statically by reading the source files rather than by
 *    importing them at runtime, because the runtime barrel pulls
 *    in sistent's `Markdown` -> `react-markdown` ESM chain that
 *    would need a widened jest `transformIgnorePatterns`.
 *    The same constraint applies to `src/custom/RJSFFormWrapper/index.ts`
 *    which re-exports RJSFFormModal (and thus the same Modal chain),
 *    so RJSFFormModal coverage also stays as a static text check.
 *
 * 3. Runtime imports from the theme sub-barrel validate that all
 *    theme generators and theme objects are defined. The theme
 *    sub-barrel (templates/widgets/generateTheme) does not pull in
 *    the Modal -> react-markdown chain, so it is safe to import.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { RJSFFormWrapper } from '../custom/RJSFFormWrapper/RJSFFormWrapper';
import {
  sistentTheme,
  sistentTemplates,
  sistentWidgets,
  generateTheme,
  generateTemplates,
  generateWidgets
} from '../custom/RJSFFormWrapper/theme';

describe('RJSFFormWrapper (sistent#1533)', () => {
  it('exports a function with stable displayName from the deep path', () => {
    expect(typeof RJSFFormWrapper).toBe('function');
    expect(
      (RJSFFormWrapper as unknown as { displayName: string }).displayName
    ).toBe('RJSFFormWrapper');
  });

  it.each([
    ['index.ts', 'src/custom/index.ts'],
    ['index.tsx', 'src/custom/index.tsx']
  ])(
    'src/custom/%s re-exports the RJSFFormWrapper module',
    (_label, relPath) => {
      const full = path.resolve(__dirname, '..', '..', relPath);
      expect(fs.existsSync(full)).toBe(true);
      const source = fs.readFileSync(full, 'utf8');
      expect(source).toMatch(/export\s+\*\s+from\s+['"]\.\/RJSFFormWrapper['"]/);
    }
  );

  it('src/custom/RJSFFormWrapper/index.ts re-exports the theme module', () => {
    const full = path.resolve(__dirname, '..', 'custom', 'RJSFFormWrapper', 'index.ts');
    expect(fs.existsSync(full)).toBe(true);
    const source = fs.readFileSync(full, 'utf8');
    expect(source).toMatch(/export\s+\*\s+from\s+['"]\.\/theme['"]/);
  });

  it('theme generators and theme objects are defined at the theme sub-barrel', () => {
    expect(typeof generateTheme).toBe('function');
    expect(typeof generateTemplates).toBe('function');
    expect(typeof generateWidgets).toBe('function');
    expect(sistentTheme).toBeDefined();
    expect(sistentTemplates).toBeDefined();
    expect(sistentWidgets).toBeDefined();
  });

  it('has dist artifacts to inspect when running in CI', () => {
    if (!process.env.CI) return;
    const distJs = path.resolve(__dirname, '..', '..', 'dist', 'index.js');
    const distDts = path.resolve(__dirname, '..', '..', 'dist', 'index.d.ts');
    const distMjs = path.resolve(__dirname, '..', '..', 'dist', 'index.mjs');
    expect(fs.existsSync(distJs)).toBe(true);
    expect(fs.existsSync(distDts)).toBe(true);
    expect(fs.existsSync(distMjs)).toBe(true);
  });

  it('published entrypoint bundle dist/index.js exports RJSF and theme symbols at runtime when built', () => {
    const distPath = path.resolve(__dirname, '..', '..', 'dist', 'index.js');
    if (process.env.CI) {
      expect(fs.existsSync(distPath)).toBe(true);
    }
    if (!fs.existsSync(distPath)) {
      return;
    }
    const output = execSync(
      `node -e 'const pkg = require("${distPath}");
      const symbols = [
        "RJSFFormModal",
        "RJSFFormWrapper",
        "hideRootObjectTitle",
        "sistentTheme",
        "sistentTemplates",
        "sistentWidgets",
        "generateTheme",
        "generateTemplates",
        "generateWidgets"
      ];
      for (const s of symbols) {
        if (typeof pkg[s] === "undefined") throw new Error("Missing: " + s);
      }
      console.log("OK");'`,
      { encoding: 'utf8' }
    );
    expect(output.trim()).toBe('OK');
  });

  it('published declaration bundle dist/index.d.ts exports RJSF and theme symbols when built', () => {
    const dtsPath = path.resolve(__dirname, '..', '..', 'dist', 'index.d.ts');
    if (process.env.CI) {
      expect(fs.existsSync(dtsPath)).toBe(true);
    }
    if (!fs.existsSync(dtsPath)) {
      // Local jest run before build; skip gracefully
      return;
    }
    const dts = fs.readFileSync(dtsPath, 'utf8');
    const dtsExportedSymbols = new Set<string>();
    for (const match of dts.matchAll(/export\s*\{([^{}]*)\}\s*;?/g)) {
      const items = match[1].split(',').map((x) => x.trim()).filter(Boolean);
      for (const item of items) {
        const exportedName = item.replace(/^type\s+/, '').split(/\s+as\s+/).pop()!.trim();
        dtsExportedSymbols.add(exportedName);
      }
    }

    const expectedDtsSymbols = [
      'RJSFFormModal',
      'RJSFFormWrapper',
      'hideRootObjectTitle',
      'sistentTheme',
      'sistentTemplates',
      'sistentWidgets',
      'generateTheme',
      'generateTemplates',
      'generateWidgets',
      'RJSFFormModalProps',
      'RJSFFormWrapperProps',
      'RJSFValidationError'
    ];
    for (const sym of expectedDtsSymbols) {
      expect(dtsExportedSymbols.has(sym)).toBe(true);
    }
  });

  it('published runtime bundle dist/index.mjs exports RJSF and theme symbols when built', () => {
    const mjsPath = path.resolve(__dirname, '..', '..', 'dist', 'index.mjs');
    if (process.env.CI) {
      expect(fs.existsSync(mjsPath)).toBe(true);
    }
    if (!fs.existsSync(mjsPath)) {
      return;
    }
    const mjs = fs.readFileSync(mjsPath, 'utf8');
    const mjsExportedSymbols = new Set<string>();
    for (const match of mjs.matchAll(/export\s*\{([^{}]*)\}\s*;?/g)) {
      const items = match[1].split(',').map((x) => x.trim()).filter(Boolean);
      for (const item of items) {
        const exportedName = item.replace(/^type\s+/, '').split(/\s+as\s+/).pop()!.trim();
        mjsExportedSymbols.add(exportedName);
      }
    }

    const expectedRuntimeSymbols = [
      'RJSFFormModal',
      'RJSFFormWrapper',
      'hideRootObjectTitle',
      'sistentTheme',
      'sistentTemplates',
      'sistentWidgets',
      'generateTheme',
      'generateTemplates',
      'generateWidgets'
    ];
    for (const sym of expectedRuntimeSymbols) {
      expect(mjsExportedSymbols.has(sym)).toBe(true);
    }
  });
});
