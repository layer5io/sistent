module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ['semistandard', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
