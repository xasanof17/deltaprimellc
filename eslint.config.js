// eslint.config.js
import js from "@eslint/js";
import next from "eslint-config-next";
import globals from "globals";

export default [
  js.configs.recommended,
  next,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
