export const prerender = false;

import type { APIContext } from 'astro';
import { createPrisma } from '@lib/db';
import { getDatabaseUrl } from '@lib/env/server';
import { summarize } from '@lib/articles/render';

/** Most recent articles to include in the feed. */
const FEED_LIMIT = 50;

const FEED_TITLE = 'Flamingo News';
const FEED_DESCRIPTION = 'Artikujt më të fundit të shkruar nga reporterët e Flamingo News.';

/**
 * Escape text for XML. Feed content comes from the database, so everything
 * is escaped rather than trusted — the same rule the article renderer follows.
 */
function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

/** Strip control characters XML 1.0 does not allow. */
function stripInvalidXmlChars(value: string): string {
	// eslint-disable-next-line no-control-regex
	return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

function xmlText(value: string): string {
	return escapeXml(stripInvalidXmlChars(value));
}

export const GET = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();
	const origin = (context.site?.toString() ?? 'https://www.flamingorevolution.eu').replace(/\/$/, '');
	const feedUrl = `${origin}/news/rss.xml`;
	const newsUrl = `${origin}/news/`;

	if (!databaseUrl) {
		return new Response('Database is not configured', { status: 500 });
	}

	const prisma = createPrisma(databaseUrl);

	let items = '';
	let lastBuildDate = new Date();

	try {
		const articles = await prisma.article.findMany({
			where: { status: 'PUBLISHED', slug: { not: null } },
			orderBy: [{ publishedAt: 'desc' }, { updatedAt: 'desc' }],
			take: FEED_LIMIT,
			include: { reporter: { select: { name: true } } }
		});

		if (articles[0]?.publishedAt) {
			lastBuildDate = articles[0].publishedAt;
		}

		items = articles
			.map((article) => {
				const link = `${origin}/news/${article.slug}/`;
				const description = article.excerpt || summarize(article.content, 300);
				const pubDate = (article.publishedAt ?? article.updatedAt).toUTCString();
				const categories = article.tags.map((tag) => `\n\t\t\t<category>${xmlText(tag)}</category>`).join('');

				return [
					'\t\t<item>',
					`\t\t\t<title>${xmlText(article.title || 'Pa titull')}</title>`,
					`\t\t\t<link>${xmlText(link)}</link>`,
					`\t\t\t<guid isPermaLink="true">${xmlText(link)}</guid>`,
					`\t\t\t<pubDate>${pubDate}</pubDate>`,
					`\t\t\t<dc:creator>${xmlText(article.reporter.name)}</dc:creator>`,
					`\t\t\t<description>${xmlText(description)}</description>${categories}`,
					'\t\t</item>'
				].join('\n');
			})
			.join('\n');
	} catch (error) {
		console.error('News RSS error:', error);
		return new Response('Feed could not be generated', { status: 502 });
	} finally {
		await prisma.$disconnect();
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>${xmlText(FEED_TITLE)}</title>
		<link>${xmlText(newsUrl)}</link>
		<description>${xmlText(FEED_DESCRIPTION)}</description>
		<language>sq</language>
		<lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
		<atom:link href="${xmlText(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=600'
		}
	});
};
