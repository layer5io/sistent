import path from 'path';
import { defineConfig } from 'tsup';

const env = process.env.NODE_ENV;

export default defineConfig({
  outDir: 'dist',
  entry: ['src/index.tsx'],
  bundle: env === 'production',
  clean: true,
  dts: { compilerOptions: { ignoreDeprecations: "6.0" } },
  format: ['cjs', 'esm'],
  external: [
    'react',
    'xstate',
    '@xstate/react',
    'react-dom',
    'mui-datatables',
    // Imported (as `use-sync-external-store/with-selector.js`) by react-redux,
    // which is bundled because src/redux-persist uses it. React 18+ ships
    // useSyncExternalStore but not the with-selector variant, so this stays a
    // real dependency rather than a peer. Its CJS build calls require('react')
    // at runtime; bundled into the ESM output that becomes an esbuild
    // `__require` shim, which throws "Dynamic require of 'react' is not
    // supported" under Node ESM (Next.js SSR).
    'use-sync-external-store',
    /^use-sync-external-store\//,
  ],
  noExternal: [/^@meshery\/schemas/],
  minify: env === 'production',
  watch: env === 'development',
  sourcemap: env === 'development',
  tsconfig: path.resolve(__dirname, './tsconfig.json')
});
