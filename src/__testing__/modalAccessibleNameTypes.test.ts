import { type Diagnostics, typeCheckFixture } from './helpers/tscFixture';

// Type-level regression guard for Modal accessible name contract (#1864).
//
// ModalProps is typed as a union requiring either `title: string`,
// `'aria-label': string`, or `'aria-labelledby': string`.
//
// jest transforms with @swc/jest, which strips types without checking them, so
// a plain type-only assertion file would pass no matter what ModalProps is.
// This test therefore shells out to `tsc` over a fixture that exercises the
// valid combinations and asserts the compile-time rejection of nameless modals,
// through the shared `typeCheckFixture` harness.

const FIXTURE = 'src/__testing__/fixtures/modalAccessibleName.tsx';
const PROJECT = 'src/__testing__/fixtures/tsconfig.modalAccessibleName.json';

describe('Modal accessible name type contract', () => {
  let diagnostics: Diagnostics;

  beforeAll(() => {
    diagnostics = typeCheckFixture(FIXTURE, PROJECT);
  }, 180_000);

  // Ordered deliberately: the two assertions below are only meaningful once the
  // fixture is known to have been compiled, so prove that first.
  it('compiles the fixture', () => {
    expect(diagnostics.compiledFixture).toBe(true);
  });

  it('reports no config-level failure that would skip the fixture', () => {
    expect(diagnostics.config).toEqual([]);
  });

  it('accepts valid accessible name combinations and rejects nameless modals', () => {
    expect(diagnostics.fixture).toEqual([]);
  });
});
