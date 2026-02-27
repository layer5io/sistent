import path from 'path';
import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig({
  outDir: 'dist',
  entry: ['src/index.tsx'],
  bundle: env === 'production',
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  external: [
    'react',
    'react-dom',
    'xstate',
    '@xstate/react',
    'mui-datatables',
    '@mui/material',
    '@mui/system',
    '@mui/utils',
    '@mui/icons-material',
    '@emotion/react',
    '@emotion/styled'
  ],
  minify: env === 'production',
  watch: env === 'development',
  sourcemap: env === 'development',
  tsconfig: path.resolve(__dirname, './tsconfig.json')
});
