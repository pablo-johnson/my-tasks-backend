import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{mjs,ts,tsx}"] },
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];