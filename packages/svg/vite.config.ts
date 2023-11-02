import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import packageJson from './package.json';

const env = process.env.NODE_ENV;

const external = [
  ...Object.keys({
    ...(packageJson.devDependencies || {}),
    ...(packageJson.peerDependencies || {})
  }),
  'react/jsx-runtime'
];

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'svg',
      fileName: 'index'
    },
    rollupOptions: {
      input: 'src/index.ts',
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
      treeshake: env === 'production'
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
