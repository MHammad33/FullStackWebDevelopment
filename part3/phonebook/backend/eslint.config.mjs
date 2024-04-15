import globals from "globals";

import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";
import js from "@eslint/js";
import plugin from "@stylistic/eslint-plugin-js";

// mimic CommonJS variables -- not needed if using CommonJS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  js.configs.recommended,
  {

    files: ["**/*.js"], languageOptions: { sourceType: "commonjs" },
    plugins: {
      "@stylistic/js": plugin
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        "error", "single"
      ],
      '@stylistic/js/semi': [
        'error'
      ],

      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
    },

  },
  { languageOptions: { globals: globals.node } },
  {
    ignores: ["node_modules/**/*", "dist/**/*", "eslint.config.mjs", "mongo.js"],
  },
  ...compat.extends("airbnb-base"),
];