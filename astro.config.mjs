import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://flamingorevolution.eu",
  output: "static",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "sq",
    locales: ["sq", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
