//vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'components',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', '@mui/material', '@emotion/react']
    }
  }
});
