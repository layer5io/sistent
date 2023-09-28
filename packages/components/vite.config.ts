import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';

const external = [
  ...Object.keys({
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
    ...(packageJson.peerDependencies || {})
  }),
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@emotion/react',
  '@emotion/styled',
  '@mui/material'
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts(), tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'components',
      fileName: 'index',
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external,
      output: {
        globals: {
          react: 'React',
          '@mui/material': 'material',
          'react/jsx-runtime': 'jsxRuntime',
          'react-error-boundary': 'reactErrorBoundary'
        }
      }
    }
  }
});
