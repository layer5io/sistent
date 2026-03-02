import path from 'path';
import { defineConfig } from 'tsup';
import pkg from './package.json';

const env = process.env.NODE_ENV;

// All deps and peerDeps must stay external — re-bundling packages like
// MUI / emotion breaks CJS ↔ ESM default-export interop at runtime.
const external = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {})
];

export default defineConfig({
  outDir: 'dist',
  entry: ['src/index.tsx'],
  bundle: env === 'production',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  external,
  minify: env === 'production',
  watch: env === 'development',
  sourcemap: env === 'development',
  tsconfig: path.resolve(__dirname, './tsconfig.json')
});
