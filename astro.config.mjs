import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: "https://flamingorevolution.eu",
  output: "static",
	integrations: [svelte(), sitemap()],
  i18n: {
    defaultLocale: "sq",
    locales: ["sq", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
