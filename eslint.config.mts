import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {ignores:['package-locks.json', 'playwright-report/**', 'test-results/**']},
  { files: ["**/*.{js,ts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'error',
    },
  },
]);
