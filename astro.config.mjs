import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

export default defineConfig({
	site: 'https://flamingorevolution.eu',
	output: 'server',
	// Prerendered content collections fail in workerd during `astro dev`.
	adapter: cloudflare({
		prerenderEnvironment: 'node'
	}),
	integrations: [svelte(), sitemap()],
	i18n: {
		defaultLocale: 'sq',
		locales: ['sq', 'en'],
		routing: {
			prefixDefaultLocale: false
		}
	}
});
