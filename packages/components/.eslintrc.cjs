module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
   },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'tsup.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['off']
  },
}
