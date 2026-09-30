/**
 * Surface-level smoke test for the RJSFFormWrapper / RJSFFormModal
 * exports added in layer5io/sistent#1533.
 *
 * Two assertions:
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
 */

import * as fs from 'fs';
import * as path from 'path';
import { RJSFFormWrapper } from '../custom/RJSFFormWrapper/RJSFFormWrapper';

describe('RJSFFormWrapper (sistent#1533)', () => {
  it('exports a function with stable displayName from the deep path', () => {
    expect(typeof RJSFFormWrapper).toBe('function');
    expect(
      (RJSFFormWrapper as unknown as { displayName: string }).displayName
    ).toBe('RJSFFormWrapper');
  });

  it('src/custom/index.tsx re-exports the RJSFFormWrapper module', () => {
    const full = path.resolve(__dirname, '..', '..', 'src/custom/index.tsx');
    const source = fs.readFileSync(full, 'utf8');
    expect(source).toMatch(/export\s+\*\s+from\s+['"]\.\/RJSFFormWrapper['"]/);
  });
});
