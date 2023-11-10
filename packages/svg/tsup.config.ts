import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig({
  entry: ['src/index.ts'],
  bundle: env === 'production',
  clean: true,
  dts: true,
  format: ['cjs'],
  external: ['react'],
  splitting: true,
  minify: env === 'production',
  skipNodeModulesBundle: true,
  watch: env === 'development'
});
