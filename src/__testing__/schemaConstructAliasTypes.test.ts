import { spawnSync } from 'child_process';
import path from 'path';

// Type-level regression guard for sistent's aliases of `@meshery/schemas`
// constructs. See `fixtures/schemaConstructAliases.ts` for what is asserted and
// why - in short, `Omit<T, 'gone'>` where `T` has no `gone` is a silent no-op,
// so deriving a local type from a canonical one does not by itself survive a
// rename upstream.
//
// jest transforms with @swc/jest, which strips types without checking them, so
// a plain type-only assertion file would pass no matter what it asserts. This
// test therefore shells out to `tsc` over the fixture, exactly as
// `navigationItemTitleTypes.test.ts` does; the two share their mechanics, and
// the comments there explain each guard against the check turning vacuous.

const FIXTURE = 'src/__testing__/fixtures/schemaConstructAliases.ts';
const PROJECT = 'src/__testing__/fixtures/tsconfig.schemaConstructAliases.json';
const repoRoot = path.resolve(__dirname, '..', '..');

const FILE_SCOPED_DIAGNOSTIC = /^(.+?)\(\d+,\d+\): error TS\d+/;
const CONFIG_SCOPED_DIAGNOSTIC = /^error TS\d+/;

const asPosix = (value: string): string => value.replace(/\\/g, '/');

type Diagnostics = { fixture: string[]; config: string[]; compiledFixture: boolean };

const TSC_TIMEOUT_MS = 150_000;

const typeCheckFixture = (): Diagnostics => {
  const tsc = spawnSync(
    process.execPath,
    [require.resolve('typescript/bin/tsc'), '-p', PROJECT, '--pretty', 'false', '--listFiles'],
    {
      cwd: repoRoot,
      encoding: 'utf8',
      timeout: TSC_TIMEOUT_MS,
      maxBuffer: 32 * 1024 * 1024
    }
  );

  if (tsc.error) throw tsc.error;
  if (tsc.status === null) {
    throw new Error(`tsc was killed by ${tsc.signal ?? 'an unknown signal'} before reporting`);
  }

  const lines = `${tsc.stdout}\n${tsc.stderr}`.split('\n').map((line) => line.trim());

  const belongsToFixture = (line: string): boolean => {
    const file = FILE_SCOPED_DIAGNOSTIC.exec(line)?.[1];
    return file !== undefined && asPosix(file).endsWith(FIXTURE);
  };

  return {
    fixture: lines.filter(belongsToFixture),
    config: lines.filter((line) => CONFIG_SCOPED_DIAGNOSTIC.test(line)),
    compiledFixture: lines.some(
      (line) => !FILE_SCOPED_DIAGNOSTIC.test(line) && asPosix(line).endsWith(FIXTURE)
    )
  };
};

describe('schemas construct alias contract', () => {
  let diagnostics: Diagnostics;

  beforeAll(() => {
    diagnostics = typeCheckFixture();
  }, 180_000);

  // Ordered deliberately: the assertion below is only meaningful once the
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
