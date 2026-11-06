import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/config.ts";

export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  build: { inlineStylesheets: "never" },
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(privacy|terms)\//.test(page),
      i18n: { defaultLocale: "ja", locales: { ja: "ja", en: "en" } },
    }),
  ],
});
