import astro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["dist/", ".astro/", "test-results/", "playwright-report/"] },
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
];
