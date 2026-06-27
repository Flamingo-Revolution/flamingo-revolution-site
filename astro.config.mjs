import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://flamingorevolution.eu",
  output: "static",
  i18n: {
    defaultLocale: "sq",
    locales: ["sq", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
