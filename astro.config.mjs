import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

const redirectOnlyPaths = new Set(['/kerkesat/', '/kontakt/', '/pulsi-i-protestes/', '/pulsi/']);

export default defineConfig({
	// Production redirects the apex domain to www, so every canonical signal
	// (HTML, sitemap, robots.txt and internal absolute links) must use www too.
	site: 'https://www.flamingorevolution.eu',
	output: 'server',
	// Prerendered content collections fail in workerd during `astro dev`.
	adapter: cloudflare({
		prerenderEnvironment: 'node'
	}),
	integrations: [
		svelte(),
		sitemap({
			// Redirect targets belong in the sitemap, not their legacy aliases.
			filter: (page) => !redirectOnlyPaths.has(new URL(page).pathname)
		})
	],
	i18n: {
		defaultLocale: 'sq',
		locales: ['sq', 'en'],
		routing: {
			prefixDefaultLocale: false
		}
	}
});
