import path from 'path';
import { defineConfig, type Options } from 'tsup';
import pkg from './package.json';

const env = process.env.NODE_ENV;

const bundled = /^@meshery\/schemas/;

const external = [
  ...new Set([
    'react',
    'xstate',
    '@xstate/react',
    'react-dom',
    'mui-datatables',
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies)
  ])
].filter((name) => !bundled.test(name));

const externalPattern = new RegExp(
  `^(${external.map((name) => name.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')).join('|')})(/.*)?$`
);

/**
 * Keeps every package in `external` out of the bundle, in place of tsup's own
 * externals handling, so that the ESM build can treat one case differently.
 *
 * Inlined CommonJS that `require()`s an external (react-redux's
 * `use-sync-external-store` requires `react`) otherwise compiles, in the ESM
 * bundle, to a runtime `require` that throws "Dynamic require of ... is not
 * supported" under native Node ESM, where `require` does not exist. There the
 * require goes through a static import instead, which every ESM loader
 * resolves. tsup's plugin claims externals before any user plugin runs, which
 * is why these packages are listed under `noExternal` and handled here.
 */
const externals: NonNullable<Options['esbuildPlugins']>[number] = {
  name: 'externals',
  setup(build) {
    const esm = build.initialOptions.format === 'esm';
    build.onResolve({ filter: externalPattern }, (args) =>
      esm && args.kind === 'require-call'
        ? { path: args.path, namespace: 'require-external' }
        : { path: args.path, external: true }
    );
    build.onLoad({ filter: /.*/, namespace: 'require-external' }, (args) => ({
      contents: `import * as ns from ${JSON.stringify(args.path)};\nmodule.exports = ns.default ?? ns;`,
      loader: 'js'
    }));
  }
};

export default defineConfig({
  outDir: 'dist',
  entry: ['src/index.tsx'],
  bundle: env === 'production',
  clean: true,
  dts: { compilerOptions: { ignoreDeprecations: '6.0' } },
  format: ['cjs', 'esm'],
  noExternal: [bundled, externalPattern],
  esbuildPlugins: [externals],
  minify: env === 'production',
  watch: env === 'development',
  sourcemap: env === 'development',
  tsconfig: path.resolve(__dirname, './tsconfig.json')
});
