/**
 * Surface-level smoke test for the RJSFFormWrapper export added in
 * layer5io/sistent#1533.
 *
 * The wrapper depends on @rjsf/core + @rjsf/mui + @rjsf/utils +
 * @rjsf/validator-ajv8, all of which are listed as (optional)
 * peerDependencies. The test verifies the standalone wrapper module
 * loads cleanly with those peers installed.
 *
 * RJSFFormModal is intentionally NOT imported here: it transitively
 * pulls in sistent's `Modal` -> `CustomTooltip` -> `Markdown` ->
 * `react-markdown` ESM chain, which would require widening Jest's
 * `transformIgnorePatterns` across half a dozen packages. The modal
 * integration is covered by downstream consumer test suites
 * (meshery-cloud `make ui-tests`).
 */

import { RJSFFormWrapper } from '../custom/RJSFFormWrapper/RJSFFormWrapper';

describe('RJSFFormWrapper (sistent#1533)', () => {
  it('exports a function with stable displayName', () => {
    expect(typeof RJSFFormWrapper).toBe('function');
    expect(
      (RJSFFormWrapper as unknown as { displayName: string }).displayName
    ).toBe('RJSFFormWrapper');
  });
});
