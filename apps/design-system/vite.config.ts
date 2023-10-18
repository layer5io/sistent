import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /@layer5\/sistent-components\/(.*)/,
        replace: path.resolve(__dirname, 'node_modules', '@layer5', 'sistent-components')
      },
      {
        find: /@layer5\/sistent-svg\/(.*)/,
        replace: path.resolve(__dirname, 'node_modules', '@layer5', 'sistent-svg')
      }
    ]
  }
});
