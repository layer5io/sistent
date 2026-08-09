import { spawnSync } from 'child_process';
import path from 'path';

// Shared harness for the repo's type-level regression guards.
//
// jest transforms with @swc/jest, which strips types without checking them, so
// a plain type-only assertion file passes no matter what it asserts. Those
// guards therefore shell out to `tsc` over a scoped fixture, and every one of
// them needs the same protections against the check quietly turning into a
// no-op - which is why the mechanics live here once rather than being copied
// per guard.

const repoRoot = path.resolve(__dirname, '..', '..', '..');

// `<file>(<line>,<col>): error TS….` The file part is what scopes a diagnostic,
// so it is parsed rather than prefix-matched: tsc prints paths relative to its
// cwd only while the fixture stays under it, and a bare `startsWith` would read
// any other emission as "the fixture is clean".
const FILE_SCOPED_DIAGNOSTIC = /^(.+?)\(\d+,\d+\): error TS\d+/;

// `error TS…` with no file part is a config-level failure - TS18003 "No inputs
// were found in config file", TS5083 "Cannot read file" - and means the fixture
// was never compiled at all. The fixture filter drops these on the floor, and a
// fixture's `@ts-expect-error` self-check cannot see them either, because
// neither fires unless the compiler had the fixture in its program.
const CONFIG_SCOPED_DIAGNOSTIC = /^error TS\d+/;

// Absence of diagnostics only means "nothing was wrong with what tsc compiled" -
// it says nothing about *what* tsc compiled. A project whose `include` resolves
// to some other existing file emits no diagnostic at all, so both lists below
// come back empty and the guard passes without ever having looked at the
// fixture. `--listFiles` closes that by making the program's contents an
// assertable fact instead of an assumption.
const asPosix = (value: string): string => value.replace(/\\/g, '/');

export type Diagnostics = {
  /** Diagnostics tsc attributed to the fixture itself. */
  fixture: string[];
  /** Config-level diagnostics, which mean the fixture was never compiled. */
  config: string[];
  /** Whether `--listFiles` proves the fixture was in the compiled program. */
  compiledFixture: boolean;
};

// Below the 180s `beforeAll` budget callers give this. `spawnSync` blocks the
// jest worker outright, and jest's own timeout cannot preempt a synchronous
// child, so a wedged tsc would otherwise hold the worker until the whole run is
// killed. Node's timeout signals the child, which surfaces as the
// `status === null` throw below.
const TSC_TIMEOUT_MS = 150_000;

/**
 * Type-checks `project` with `tsc` and returns the diagnostics scoped to
 * `fixture`, plus the proof that `fixture` was actually compiled.
 *
 * @param fixture repo-relative POSIX path of the fixture file.
 * @param project repo-relative POSIX path of the tsconfig that includes it.
 */
export const typeCheckFixture = (fixture: string, project: string): Diagnostics => {
  // Spawned through `process.execPath` rather than `npx`: no shell, no PATH
  // lookup, and no `npx` vs `npx.cmd` divergence on Windows, where an ENOENT
  // would otherwise be caught and laundered into the diagnostic output.
  const tsc = spawnSync(
    process.execPath,
    [require.resolve('typescript/bin/tsc'), '-p', project, '--pretty', 'false', '--listFiles'],
    {
      cwd: repoRoot,
      encoding: 'utf8',
      timeout: TSC_TIMEOUT_MS,
      // tsc reports on every file in the program, and `--listFiles` prints each
      // one, so this runs to several MB. The 1 MB default would kill the child
      // mid-stream and truncate stdout - and the fixture is a root file, so its
      // diagnostics are emitted last and lost first.
      maxBuffer: 32 * 1024 * 1024
    }
  );

  // A compiler that never ran is not a compiler that found nothing.
  if (tsc.error) throw tsc.error;
  if (tsc.status === null) {
    throw new Error(`tsc was killed by ${tsc.signal ?? 'an unknown signal'} before reporting`);
  }

  // tsc exits non-zero whenever any file in the program has an error, including
  // the pre-existing ones outside the fixture, so the exit code is not the
  // verdict here - the diagnostics are.
  const lines = `${tsc.stdout}\n${tsc.stderr}`.split('\n').map((line) => line.trim());

  const belongsToFixture = (line: string): boolean => {
    const file = FILE_SCOPED_DIAGNOSTIC.exec(line)?.[1];
    return file !== undefined && asPosix(file).endsWith(fixture);
  };

  return {
    fixture: lines.filter(belongsToFixture),
    config: lines.filter((line) => CONFIG_SCOPED_DIAGNOSTIC.test(line)),
    // `--listFiles` prints one absolute path per program file, diagnostics aside.
    compiledFixture: lines.some(
      (line) => !FILE_SCOPED_DIAGNOSTIC.test(line) && asPosix(line).endsWith(fixture)
    )
  };
};
