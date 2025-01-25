import { fixupConfigRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/jest.config.js",
        "**/vite.config.ts",
        "**/.eslintrc.cjs",
        "**/node_modules",
        "**/dist",
        "**/*.md",
        "**/site",
        "apps/next-12",
        "**/.yarnrc.yml",
        "**/.eslintrc.*js",
        "**/*.config.*js",
        "**/eslint-config-sistent",
        "apps/design-system",
    ],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
)), {
    plugins: {
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },
}];