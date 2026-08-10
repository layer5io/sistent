import { type Diagnostics, typeCheckFixture } from './helpers/tscFixture';

// Type-level regression guard for https://github.com/layer5io/sistent/issues/1746.
//
// `NavigationNavbar` renders `NavigationItem['title']` into MUI's `ListItemText`
// `primary` slot, which is typed `React.ReactNode`. While `title` was declared
// `string`, composed labels rendered correctly but did not type-check, and
// consumers reached for `as unknown as string`.
//
// jest transforms with @swc/jest, which strips types without checking them, so a
// plain type-only assertion file would pass no matter what `title` is declared
// as. This test therefore shells out to `tsc` over a fixture that exercises both
// a plain string and a composed `ReactNode` title, through the shared
// `typeCheckFixture` harness - which is where the guards that keep the check
// from turning vacuous (diagnostic scoping, config-level failures, `--listFiles`
// proof that the fixture was compiled) are documented.
//
// Diagnostics are filtered to the fixture itself: type-checking it pulls in the
// component's transitive dependencies, which carry pre-existing errors unrelated
// to this contract (see CLAUDE.md, "Repo state that looks broken but is
// pre-existing"). The fixture's own `@ts-expect-error` self-check fails loudly if
// the compiler ever stops checking it, so filtering cannot make this vacuous.

const FIXTURE = 'src/__testing__/fixtures/navigationItemTitle.tsx';
const PROJECT = 'src/__testing__/fixtures/tsconfig.navigationItemTitle.json';

describe('NavigationItem title type contract', () => {
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

  it('accepts both a plain string and a composed ReactNode title', () => {
    expect(diagnostics.fixture).toEqual([]);
  });
});
