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
 * runs on, resolved through tsup so the test does not depend on hoisting. Same
 * build contract as the other dist guards: it skips without a build and fails
 * in CI without one.
 */
import fs from 'fs';
import path from 'path';

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
});
