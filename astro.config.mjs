import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import { flamingoTimesIssues } from './src/data/flamingoTimes';

const redirectOnlyPaths = new Set(['/kerkesat/', '/kontakt/', '/pulsi-i-protestes/', '/pulsi/']);
const noindexPaths = new Set(['/diaspora-zbarkon/', '/reporteret-e-diaspores/']);
const latestTimesIssuePath = flamingoTimesIssues[0]?.href;

const highPriorityPaths = new Map([
	['/', 1],
	['/referendum/', 0.9],
	['/idete-tuaja/', 0.9],
	['/flamingo-times/', 0.9],
	['/lojerat/', 0.9],
	['/dosjet/', 0.9],
	['/rreth-nesh/', 0.9],
	['/protestat/', 0.9]
]);

export default defineConfig({
	// Production redirects the apex domain to www, so every canonical signal
	// (HTML, sitemap, robots.txt and internal absolute links) must use www too.
	site: 'https://www.flamingorevolution.eu',
	trailingSlash: 'always',
	output: 'server',
	// Prerendered content collections fail in workerd during `astro dev`.
	adapter: cloudflare({
		prerenderEnvironment: 'node'
	}),
	integrations: [
		svelte(),
		sitemap({
			filter: (page) => {
				const pathname = new URL(page).pathname;
				return (
					!pathname.startsWith('/redaksia/panel/') &&
					!redirectOnlyPaths.has(pathname) &&
					!noindexPaths.has(pathname) &&
					pathname !== latestTimesIssuePath
				);
			},
			serialize(item) {
				const pathname = new URL(item.url).pathname;
				const priority = highPriorityPaths.get(pathname);
				if (priority !== undefined) {
					item.priority = priority;
				}
				return item;
			}
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
