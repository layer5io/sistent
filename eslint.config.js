const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const typescript = require("@typescript-eslint/eslint-plugin");
const globals = require("globals");

module.exports = [
    // Global ignores
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/*.md",
            "**/jest.config.js",
            "**/vite.config.ts",
            "**/.eslintrc.cjs",
            "**/site/**",
            "apps/next-12/**",
            "**/.yarnrc.yml",
            "**/.eslintrc.*js",
            "**/*.config.*js",
            "**/eslint-config-sistent/**",
            "apps/design-system/**",
            "examples/**",
            "**/build/**",
            "**/coverage/**",
            "**/.claude/**",
        ]
    },

    // Test files configuration
    {
        files: ["**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**/*.{js,jsx,ts,tsx}"],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest,
                React: "readonly",
                JSX: "readonly",
                NodeJS: "readonly",
            },
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                requireConfigFile: false,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            "@typescript-eslint": typescript,
        },

        rules: {
            ...js.configs.recommended.rules,
            ...typescript.configs.recommended.rules,
        },

        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },

    // Main configuration
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        ignores: ["**/*.test.{js,jsx,ts,tsx}", "**/__tests__/**/*.{js,jsx,ts,tsx}"],

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                React: "readonly",
                JSX: "readonly",
                NodeJS: "readonly",
            },
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                requireConfigFile: false,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        plugins: {
            "@typescript-eslint": typescript,
        },

        rules: {
            ...js.configs.recommended.rules,
            ...typescript.configs.recommended.rules,
        },

        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    }
];
