import { type Diagnostics, typeCheckFixture } from './helpers/tscFixture';

// Type-level regression guard for sistent's aliases of `@meshery/schemas`
// constructs. See `fixtures/schemaConstructAliases.ts` for what is asserted and
// why - in short, `Omit<T, 'gone'>` where `T` has no `gone` is a silent no-op,
// so deriving a local type from a canonical one does not by itself survive a
// rename upstream.
//
// jest transforms with @swc/jest, which strips types without checking them, so
// a plain type-only assertion file would pass no matter what it asserts. This
// test therefore shells out to `tsc` over the fixture through the shared
// `typeCheckFixture` harness, which documents each guard that keeps the check
// from turning vacuous.

const FIXTURE = 'src/__testing__/fixtures/schemaConstructAliases.ts';
const PROJECT = 'src/__testing__/fixtures/tsconfig.schemaConstructAliases.json';

describe('schemas construct alias contract', () => {
  let diagnostics: Diagnostics;

  beforeAll(() => {
    diagnostics = typeCheckFixture(FIXTURE, PROJECT);
  }, 180_000);

  // Ordered deliberately: the assertions below are only meaningful once the
  // fixture is known to have been compiled, so prove that first.
  it('compiles the fixture', () => {
    expect(diagnostics.compiledFixture).toBe(true);
  });

  it('reports no config-level failure that would skip the fixture', () => {
    expect(diagnostics.config).toEqual([]);
  });

  it('keeps every aliased local type bound to its canonical construct', () => {
    expect(diagnostics.fixture).toEqual([]);
  });
});
