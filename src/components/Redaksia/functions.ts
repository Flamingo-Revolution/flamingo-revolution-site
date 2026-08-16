import type { JSONContent } from '@tiptap/core';

export type PublicReporter = {
	id: string;
	name: string;
	slug: string;
};

export type PublicArticle = {
	id: string;
	title: string;
	slug: string | null;
	excerpt: string;
	tags: string[];
	coverImageUrl: string | null;
	status: 'DRAFT' | 'PUBLISHED';
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
};

export type PublicArticleWithContent = PublicArticle & {
	content: JSONContent;
};

export type ArticlePatch = {
	title?: string;
	excerpt?: string;
	tags?: string[];
	coverImageUrl?: string | null;
	content?: JSONContent;
	action?: 'publish' | 'unpublish';
};

async function parseJson(response: Response): Promise<Record<string, unknown>> {
	try {
		const data: unknown = await response.json();
		return typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {};
	} catch {
		return {};
	}
}

function errorMessage(data: Record<string, unknown>, fallback: string): string {
	return typeof data.error === 'string' ? data.error : fallback;
}

export async function fetchMe(): Promise<PublicReporter | null> {
	const response = await fetch('/api/reporter/me');
	if (!response.ok) return null;

	const data = await parseJson(response);
	return (data.reporter as PublicReporter) ?? null;
}

export async function login(accessKey: string): Promise<PublicReporter> {
	const response = await fetch('/api/reporter/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ accessKey })
	});

	const data = await parseJson(response);

	if (!response.ok) {
		throw new Error(errorMessage(data, 'Hyrja dështoi.'));
	}

	return data.reporter as PublicReporter;
}

export async function logout(): Promise<void> {
	await fetch('/api/reporter/logout', { method: 'POST' });
}

export async function fetchArticles(): Promise<PublicArticle[]> {
	const response = await fetch('/api/reporter/articles');
	const data = await parseJson(response);

	if (!response.ok) {
		throw new Error(errorMessage(data, 'Artikujt nuk u ngarkuan.'));
	}

	return (data.articles as PublicArticle[]) ?? [];
}

export async function createArticle(title = ''): Promise<PublicArticle> {
	const response = await fetch('/api/reporter/articles', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title })
	});

	const data = await parseJson(response);

	if (!response.ok) {
		throw new Error(errorMessage(data, 'Artikulli nuk u krijua.'));
	}

	return data.article as PublicArticle;
}

export async function fetchArticle(id: string): Promise<PublicArticleWithContent> {
	const response = await fetch(`/api/reporter/articles/${id}`);
	const data = await parseJson(response);

	if (!response.ok) {
		throw new Error(errorMessage(data, 'Artikulli nuk u ngarkua.'));
	}

	return data.article as PublicArticleWithContent;
}

export async function patchArticle(id: string, patch: ArticlePatch): Promise<PublicArticleWithContent> {
	const response = await fetch(`/api/reporter/articles/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(patch)
	});

	const data = await parseJson(response);

	if (!response.ok) {
		throw new Error(errorMessage(data, 'Artikulli nuk u ruajt.'));
	}

	return data.article as PublicArticleWithContent;
}

export async function uploadImage(articleId: string, file: File): Promise<string> {
	const form = new FormData();
	form.append('file', file);
	form.append('articleId', articleId);

	const response = await fetch('/api/reporter/media', { method: 'POST', body: form });
	const data = await parseJson(response);

	if (!response.ok) {
		throw new Error(errorMessage(data, 'Imazhi nuk u ngarkua.'));
	}

	return data.url as string;
}

export async function deleteArticle(id: string): Promise<void> {
	const response = await fetch(`/api/reporter/articles/${id}`, { method: 'DELETE' });

	if (!response.ok) {
		const data = await parseJson(response);
		throw new Error(errorMessage(data, 'Artikulli nuk u fshi.'));
	}
}

export function formatDate(iso: string): string {
	try {
		return new Intl.DateTimeFormat('sq-AL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
	} catch {
		return iso;
	}
}
