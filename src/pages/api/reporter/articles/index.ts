export const prerender = false;

import type { APIContext } from 'astro';
import { createPrisma } from '@lib/db';
import { getDatabaseUrl } from '@lib/env/server';
import { isRecord, jsonResponse } from '@lib/functions';
import { getSessionReporter } from '@lib/auth';
import { MAX_ARTICLE_TITLE_LENGTH, toPublicArticle } from '@lib/articles';

export const GET = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const reporter = await getSessionReporter(prisma, context.cookies);

		if (!reporter) {
			return jsonResponse({ error: 'Kërkohet hyrja.' }, 401);
		}

		const articles = await prisma.article.findMany({
			where: { reporterId: reporter.id },
			orderBy: [{ updatedAt: 'desc' }]
		});

		return jsonResponse({ articles: articles.map(toPublicArticle) }, 200, 'private, no-store');
	} catch (error) {
		console.error('Articles GET error:', error);
		return jsonResponse({ error: 'Artikujt nuk u ngarkuan.' }, 502);
	} finally {
		await prisma.$disconnect();
	}
};

export const POST = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	let body: unknown = {};

	try {
		body = await context.request.json();
	} catch {
		// An empty body is fine for creating a fresh draft.
	}

	const title =
		isRecord(body) && typeof body.title === 'string' ? body.title.trim().slice(0, MAX_ARTICLE_TITLE_LENGTH) : '';

	const prisma = createPrisma(databaseUrl);

	try {
		const reporter = await getSessionReporter(prisma, context.cookies);

		if (!reporter) {
			return jsonResponse({ error: 'Kërkohet hyrja.' }, 401);
		}

		const article = await prisma.article.create({
			data: {
				title,
				reporterId: reporter.id,
				content: { type: 'doc', content: [{ type: 'paragraph' }] }
			}
		});

		return jsonResponse({ article: toPublicArticle(article) }, 201);
	} catch (error) {
		console.error('Articles POST error:', error);
		return jsonResponse({ error: 'Artikulli nuk u krijua.' }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
