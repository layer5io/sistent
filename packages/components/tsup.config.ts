import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  bundle: true,
  treeshake: true,
  minify: true,
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  format: ['esm', 'cjs'],
  target: 'es2020',
  cjsInterop: true,
  external: [
    'react',
    '@mui/material',
    '@mui/base',
    '@emotion/react',
    '@emotion/styled',
    '@mui/styled-engine-sc',
    '@mui-datatables',
    '@types/mui-datatables',
    'react-error-boundary'
  ],
  injectStyle: false
});
