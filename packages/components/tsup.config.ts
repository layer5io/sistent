import path from 'path';
import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig({
  outdir: 'dist',
  entry: ['src/index.tsx'],
  bundle: env === 'production',
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  external: ['react', 'react/jsx-runtime', '@mui/material', '@emotion/react', '@emotion/styled'],
  splitting: true,
  minify: env === 'production',
  skipNodeModulesBundle: true,
  watch: env === 'development',
  sourcemap: env === 'development',
  tsconfig: path.resolve(__dirname, './tsconfig.json')
});
