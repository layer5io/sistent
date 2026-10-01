/**
 * Surface-level smoke test for the RJSFFormWrapper / RJSFFormModal
 * exports added in layer5io/sistent#1533.
 *
 * This checks that the wrapper module loads cleanly with the @rjsf/*
 * peer-deps installed (deep-path import). That both symbols are declared
 * and shipped from the package root is pinned against the built bundles
 * in `declarationRuntimeExportParity.test.ts`.
 */

import { RJSFFormWrapper } from '../custom/RJSFFormWrapper/RJSFFormWrapper';

describe('RJSFFormWrapper (sistent#1533)', () => {
  it('exports a function with stable displayName from the deep path', () => {
    expect(typeof RJSFFormWrapper).toBe('function');
    expect((RJSFFormWrapper as unknown as { displayName: string }).displayName).toBe(
      'RJSFFormWrapper'
    );
  });
});
