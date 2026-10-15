/**
 * @jest-environment node
 */
/**
 * `dist/index.mjs` must bundle as ES modules, the way a consumer's bundler
 * links it.
 *
 * Jest runs sources through a CommonJS transform whose interop synthesizes a
 * `default` for every module, and the CommonJS bundle gets the same courtesy at
 * runtime. A bundler linking the ESM bundle does not: it resolves each
 * dependency through its `import` condition, and a default import of a package
 * whose ESM entry has only named exports is a hard link error. js-yaml 5 is
 * such a package, and `import jsyaml from 'js-yaml'` in the catalog helpers
 * shipped exactly that - "No matching export ... for import 'default'" - while
 * every test here stayed green.
 *
 * So this bundles the built artifact with esbuild, the bundler tsup itself
 * runs on, resolved through tsup so the test does not depend on hoisting.
 *
 * Node's own ESM loader is stricter than a bundler, so it is checked too: it
 * does not add extensions to deep imports (`lodash/debounce` must be
 * `lodash/debounce.js`) and cannot see named exports of a CommonJS package
 * such as lodash (`import { debounce } from 'lodash'`), and it has no
 * `require` for inlined CommonJS that requires an external (see the
 * `externals` plugin in tsup.config.ts). That import runs in a
 * child process, because Jest's transform would rewrite `import()` into
 * `require()` and hide all three. Same build contract as the other dist guards: it
 * skips without a build and fails in CI without one.
 */
import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const ROOT = path.resolve(__dirname, '..', '..');
const ESM = path.join(ROOT, 'dist', 'index.mjs');

type BuildFailure = { errors?: { text: string; location?: { file: string } | null }[] };

const loadEsbuild = (): Promise<typeof import('esbuild')> =>
  import(
    require.resolve('esbuild', {
      paths: [path.dirname(require.resolve('tsup/package.json', { paths: [ROOT] }))]
    })
  );

/** Link errors from bundling `entry` as ESM; empty when it links cleanly. */
const esmLinkErrors = async (entry: string): Promise<string[]> => {
  const esbuild = await loadEsbuild();
  try {
    await esbuild.build({
      absWorkingDir: ROOT,
      entryPoints: [entry],
      bundle: true,
      write: false,
      format: 'esm',
      platform: 'node',
      mainFields: ['module', 'main'],
      logLevel: 'silent'
    });
    return [];
  } catch (error) {
    const { errors } = error as BuildFailure;
    if (!errors?.length) throw error;
    return errors.map((e) => `${e.text} (${e.location?.file ?? 'unknown'})`);
  }
};

/** Error from Node natively importing `entry`; empty when it loads. */
const nativeImportError = (entry: string): Promise<string> =>
  new Promise((resolve) => {
    execFile(
      process.execPath,
      ['--input-type=module', '-e', `await import(${JSON.stringify(pathToFileURL(entry).href)});`],
      { cwd: ROOT, maxBuffer: 16 * 1024 * 1024 },
      (error, _stdout, stderr) => resolve(error ? stderr.trim() || error.message : '')
    );
  });

describe('ESM bundle', () => {
  const built = fs.existsSync(ESM);

  // Skipping is right for `jest` on its own, before a build. In CI it is not:
  // CI builds first, so a missing bundle means the guard would pass vacuously.
  it('has the built bundle to link when running in CI', () => {
    if (!process.env.CI) return;
    expect(built).toBe(true);
  });

  (built ? it : it.skip)(
    'links every import against its dependency ESM entry',
    async () => {
      expect(await esmLinkErrors(ESM)).toEqual([]);
    },
    120_000
  );

  (built ? it : it.skip)(
    'loads under native Node ESM resolution',
    async () => {
      expect(await nativeImportError(ESM)).toBe('');
    },
    120_000
  );
});
