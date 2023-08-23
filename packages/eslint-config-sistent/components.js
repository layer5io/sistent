module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended'
    ],
    overrides: [
        {
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                project: null,
                sourceType: 'script'
            },
            rules: {
                "@typescript-eslint/*": "off"
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {}
};