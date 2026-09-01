export const prerender = false;

import type { APIContext } from 'astro';
import { createPrisma } from '@lib/db';
import { getDatabaseUrl, getMediaBucket } from '@lib/env/server';
import { jsonResponse } from '@lib/functions';
import { getSessionReporter } from '@lib/auth';
import { ALLOWED_IMAGE_TYPES, buildMediaKey, MAX_UPLOAD_BYTES, mediaUrlForKey } from '@lib/media';

export const POST = async (context: APIContext) => {
	const databaseUrl = getDatabaseUrl();

	if (!databaseUrl) {
		return jsonResponse({ error: 'DATABASE_URL is not configured.' }, 500);
	}

	const bucket = getMediaBucket();

	if (!bucket) {
		return jsonResponse({ error: 'Ruajtja e imazheve nuk është e konfiguruar.' }, 500);
	}

	let form: FormData;

	try {
		form = await context.request.formData();
	} catch {
		return jsonResponse({ error: 'Kërkesa duhet të jetë multipart/form-data.' }, 400);
	}

	const file = form.get('file');
	const articleId = typeof form.get('articleId') === 'string' ? (form.get('articleId') as string).trim() : '';

	if (!(file instanceof File)) {
		return jsonResponse({ error: 'Skedari mungon.' }, 400);
	}

	if (!articleId) {
		return jsonResponse({ error: 'Artikulli mungon.' }, 400);
	}

	if (!(file.type in ALLOWED_IMAGE_TYPES)) {
		return jsonResponse({ error: 'Lejohen vetëm imazhe (JPG, PNG, WebP, GIF, AVIF, SVG).' }, 415);
	}

	if (file.size === 0 || file.size > MAX_UPLOAD_BYTES) {
		return jsonResponse({ error: `Imazhi duhet të jetë deri në ${Math.floor(MAX_UPLOAD_BYTES / 1024 / 1024)} MB.` }, 413);
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

		const key = buildMediaKey(article.id, file.type);

		if (!key) {
			return jsonResponse({ error: 'Formati i imazhit nuk njihet.' }, 415);
		}

		await bucket.put(key, file, {
			httpMetadata: {
				contentType: file.type,
				cacheControl: 'public, max-age=31536000, immutable'
			}
		});

		return jsonResponse({ url: mediaUrlForKey(key), key }, 201);
	} catch (error) {
		console.error('Media POST error:', error);
		return jsonResponse({ error: 'Imazhi nuk u ngarkua.' }, 500);
	} finally {
		await prisma.$disconnect();
	}
};
