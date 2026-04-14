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
  external: ['react', 'xstate', '@xstate/react', 'react-dom', 'mui-datatables'],
  noExternal: [/^@meshery\/schemas/, 'rxjs'],
  minify: env === 'production',
  watch: env === 'development',
  sourcemap: env === 'development',
  tsconfig: path.resolve(__dirname, './tsconfig.json')
});
