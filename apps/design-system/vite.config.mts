import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
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
  '@mui/material',
  '@mui/styled-engine-sc',
  'mui-datatables',
  '@types/mui-datatables'
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic'
  })],
  optimizeDeps: {
    include: [
      '@emotion/react',
      'react/jsx-runtime'
    ],
  },
  resolve: {
    dedupe: ['@emotion/react'],
  },
  rollupOptions: {
    external,
    output: {
      globals: {
        react: 'React',
        '@mui/material': 'material',
        'react/jsx-runtime': 'jsxRuntime',
        'react-error-boundary': 'reactErrorBoundary',
        'mui-datatables': 'muiDatatables'
      }
    }
  }
});
