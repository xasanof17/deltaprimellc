// eslint.config.js
import js from "@eslint/js";
import next from "eslint-config-next";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";

export default [
  js.configs.recommended,
  next,
  {
    plugins: { tailwind },
    rules: {
      // optional: silence canonical class warnings
      "tailwindcss/suggestCanonicalClasses": "off",
      "tailwindcss/classnames-order": "off",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
