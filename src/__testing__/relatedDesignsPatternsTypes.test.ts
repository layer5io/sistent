import { type Diagnostics, typeCheckFixture } from './helpers/tscFixture';

// Type-level regression guard for https://github.com/layer5io/sistent/issues/1873.
//
// `RightPanel` and `RelatedDesigns` receive patterns from canonical `getPatterns`
// (`GetPatternsApiResponse`), which returns optional `patterns` where items do
// not guarantee `avatarUrl`, `user`, or required fields from full `Pattern`.
//
// This test shells out to `tsc` over a fixture that exercises:
// - passing canonical GetPatternsApiResponse directly
// - passing undefined patternsPerUser
// - passing empty or missing patterns response
// - passing complete Pattern[] (consumers must type onSuggestedPatternClick as (pattern: SuggestedPattern) => void)

const FIXTURE = 'src/__testing__/fixtures/relatedDesignsPatterns.tsx';
const PROJECT = 'src/__testing__/fixtures/tsconfig.relatedDesignsPatterns.json';

describe('RightPanel / RelatedDesigns patternsPerUser type contract (Issue #1873)', () => {
  let diagnostics: Diagnostics;

  beforeAll(() => {
    diagnostics = typeCheckFixture(FIXTURE, PROJECT);
  }, 180_000);

  it('compiles the fixture', () => {
    expect(diagnostics.compiledFixture).toBe(true);
  });

  it('reports no config-level failure that would skip the fixture', () => {
    expect(diagnostics.config).toEqual([]);
  });

  it('accepts canonical GetPatternsApiResponse, undefined, and complete Pattern without casts', () => {
    expect(diagnostics.fixture).toEqual([]);
  });
});
