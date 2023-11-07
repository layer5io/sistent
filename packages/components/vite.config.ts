import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';

const env = process.env.NODE_ENV;

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
  '@layer5/sistent-svg'
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts(), tsconfigPaths()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'component',
      fileName: 'index'
    },
    rollupOptions: {
      input: 'src/index.tsx',
      output: [
        {
          dir: 'dist',
          format: 'es',
          entryFileNames: 'index.es.js',
          exports: 'auto'
        },
        {
          dir: 'dist',
          format: 'cjs',
          entryFileNames: 'index.cjs.js',
          exports: 'auto'
        }
      ],
      external,
      treeshake: env === 'production',
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      }
    },
    minify: env === 'production'
  },
  optimizeDeps: {
    include: ['react']
  },
  server: {
    open: true,
    hmr: env === 'development'
  }
});
