export const prerender = false;

import type { APIContext } from 'astro';
import type { Prisma, PrismaClient } from '@prisma/client';
import { createPrisma } from '@lib/db';
import { getDatabaseUrl } from '@lib/env/server';
import { isRecord, jsonResponse } from '@lib/functions';
import { getSessionReporter } from '@lib/auth';
import {
	MAX_ARTICLE_EXCERPT_LENGTH,
	MAX_ARTICLE_TITLE_LENGTH,
	parseArticleContent,
	parseImageUrl,
	slugifyTitle,
	toPublicArticleWithContent
} from '@lib/articles';

async function resolveUniqueSlug(prisma: PrismaClient, base: string, articleId: string): Promise<string> {
	const fallback = base || `artikull-${articleId.slice(0, 8)}`;

	const existing = await prisma.article.findUnique({ where: { slug: fallback } });
	if (!existing || existing.id === articleId) return fallback;

	return `${fallback}-${articleId.slice(0, 8)}`;
}

export const GET = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();
	const articleId = context.params.id?.trim();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	if (!articleId) {
		return jsonResponse({ error: 'Artikulli mungon.' }, 400);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const reporter = await getSessionReporter(prisma, context.cookies);

		if (!reporter) {
			return jsonResponse({ error: 'Kërkohet hyrja.' }, 401);
		}

		const article = await prisma.article.findUnique({ where: { id: articleId } });

		if (!article || article.reporterId !== reporter.id) {
			return jsonResponse({ error: 'Artikulli nuk u gjet.' }, 404);
		}

		return jsonResponse({ article: toPublicArticleWithContent(article) }, 200, 'private, no-store');
	} catch (error) {
		console.error('Article GET error:', error);
		return jsonResponse({ error: 'Artikulli nuk u ngarkua.' }, 502);
	} finally {
		await prisma.$disconnect();
	}
};

export const PATCH = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();
	const articleId = context.params.id?.trim();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	if (!articleId) {
		return jsonResponse({ error: 'Artikulli mungon.' }, 400);
	}

	let body: unknown;

	try {
		body = await context.request.json();
	} catch {
		return jsonResponse({ error: 'Invalid JSON body.' }, 400);
	}

	if (!isRecord(body)) {
		return jsonResponse({ error: 'Invalid request body.' }, 400);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const reporter = await getSessionReporter(prisma, context.cookies);

		if (!reporter) {
			return jsonResponse({ error: 'Kërkohet hyrja.' }, 401);
		}

		const article = await prisma.article.findUnique({ where: { id: articleId } });

		if (!article || article.reporterId !== reporter.id) {
			return jsonResponse({ error: 'Artikulli nuk u gjet.' }, 404);
		}

		const data: Prisma.ArticleUpdateInput = {};

		if (typeof body.title === 'string') {
			data.title = body.title.trim().slice(0, MAX_ARTICLE_TITLE_LENGTH);
		}

		if (typeof body.excerpt === 'string') {
			data.excerpt = body.excerpt.trim().slice(0, MAX_ARTICLE_EXCERPT_LENGTH);
		}

		if ('coverImageUrl' in body) {
			data.coverImageUrl = body.coverImageUrl === null ? null : parseImageUrl(body.coverImageUrl);
		}

		if ('content' in body) {
			const content = parseArticleContent(body.content);

			if (!content) {
				return jsonResponse({ error: 'Përmbajtja e artikullit është e pavlefshme.' }, 400);
			}

			data.content = content;
		}

		const action = typeof body.action === 'string' ? body.action : null;

		if (action === 'publish') {
			const title = typeof data.title === 'string' ? data.title : article.title;

			if (!title.trim()) {
				return jsonResponse({ error: 'Shtoni një titull para publikimit.' }, 400);
			}

			data.status = 'PUBLISHED';
			data.publishedAt = article.publishedAt ?? new Date();
			data.slug = article.slug ?? (await resolveUniqueSlug(prisma, slugifyTitle(title), article.id));
		} else if (action === 'unpublish') {
			data.status = 'DRAFT';
		} else if (action !== null) {
			return jsonResponse({ error: 'Veprim i panjohur.' }, 400);
		}

		const updated = await prisma.article.update({ where: { id: article.id }, data });

		return jsonResponse({ article: toPublicArticleWithContent(updated) }, 200);
	} catch (error) {
		console.error('Article PATCH error:', error);
		return jsonResponse({ error: 'Artikulli nuk u ruajt.' }, 500);
	} finally {
		await prisma.$disconnect();
	}
};

export const DELETE = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();
	const articleId = context.params.id?.trim();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	if (!articleId) {
		return jsonResponse({ error: 'Artikulli mungon.' }, 400);
	}

	const prisma = createPrisma(databaseUrl);

	try {
		const reporter = await getSessionReporter(prisma, context.cookies);

		if (!reporter) {
			return jsonResponse({ error: 'Kërkohet hyrja.' }, 401);
		}

		const article = await prisma.article.findUnique({ where: { id: articleId } });

		if (!article || article.reporterId !== reporter.id) {
			return jsonResponse({ error: 'Artikulli nuk u gjet.' }, 404);
		}

		await prisma.article.delete({ where: { id: article.id } });

		return jsonResponse({ ok: true }, 200);
	} catch (error) {
		console.error('Article DELETE error:', error);
		return jsonResponse({ error: 'Artikulli nuk u fshi.' }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
