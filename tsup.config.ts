import path from 'path';
import { defineConfig } from 'tsup';
import pkg from './package.json';

const env = process.env.NODE_ENV;

const esmOnlyPackages = [
  'react-markdown',
  'rehype-raw',
  'remark-gfm',
];

const allDeps = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.devDependencies ?? {}),
];

const external: (string | RegExp)[] = allDeps.filter(
  (dep) => !esmOnlyPackages.includes(dep),
);

export default defineConfig({
  outDir: 'dist',
  entry: ['src/index.tsx'],
  bundle: env === 'production',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  external,
  noExternal: esmOnlyPackages,
  minify: env === 'production',
  watch: env === 'development',
  sourcemap: env === 'development',
  tsconfig: path.resolve(__dirname, './tsconfig.json')
});
