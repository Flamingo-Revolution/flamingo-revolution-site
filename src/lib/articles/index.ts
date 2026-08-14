import type { Article, Prisma } from '@prisma/client';

export const MAX_ARTICLE_TITLE_LENGTH = 200;
export const MAX_ARTICLE_EXCERPT_LENGTH = 500;
export const MAX_ARTICLE_CONTENT_BYTES = 512 * 1024;
export const MAX_IMAGE_URL_LENGTH = 2048;

export type PublicArticle = {
	id: string;
	title: string;
	slug: string | null;
	excerpt: string;
	coverImageUrl: string | null;
	status: 'DRAFT' | 'PUBLISHED';
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
};

export type PublicArticleWithContent = PublicArticle & {
	content: Prisma.JsonValue;
};

export function toPublicArticle(article: Article): PublicArticle {
	return {
		id: article.id,
		title: article.title,
		slug: article.slug,
		excerpt: article.excerpt,
		coverImageUrl: article.coverImageUrl,
		status: article.status,
		createdAt: article.createdAt.toISOString(),
		updatedAt: article.updatedAt.toISOString(),
		publishedAt: article.publishedAt?.toISOString() ?? null
	};
}

export function toPublicArticleWithContent(article: Article): PublicArticleWithContent {
	return { ...toPublicArticle(article), content: article.content };
}

export function slugifyTitle(title: string): string {
	return title
		.toLowerCase()
		.replace(/ë/g, 'e')
		.replace(/ç/g, 'c')
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 96);
}

/**
 * Validate that a value looks like a Tiptap document and is within size
 * limits. Returns the value if acceptable, otherwise null.
 */
export function parseArticleContent(value: unknown): Prisma.InputJsonValue | null {
	if (typeof value !== 'object' || value === null || Array.isArray(value)) return null;

	const doc = value as Record<string, unknown>;
	if (doc.type !== 'doc') return null;

	try {
		const serialized = JSON.stringify(value);
		if (new TextEncoder().encode(serialized).length > MAX_ARTICLE_CONTENT_BYTES) return null;
	} catch {
		return null;
	}

	return value as Prisma.InputJsonValue;
}

export function parseImageUrl(value: unknown): string | null {
	if (typeof value !== 'string') return null;

	const trimmed = value.trim();
	if (!trimmed || trimmed.length > MAX_IMAGE_URL_LENGTH) return null;

	try {
		const url = new URL(trimmed);
		if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
	} catch {
		return null;
	}

	return trimmed;
}
