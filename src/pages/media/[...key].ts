export const prerender = false;

import type { APIContext } from 'astro';
import { getMediaBucket } from '@lib/env/server';
import { MEDIA_KEY_PATTERN } from '@lib/media';

/** Public, immutable serving of uploaded article media from R2. */
export const GET = async (context: APIContext) => {
	const key = context.params.key ?? '';

	if (!MEDIA_KEY_PATTERN.test(key)) {
		return new Response('Not found', { status: 404 });
	}

	const bucket = getMediaBucket();

	if (!bucket) {
		return new Response('Media storage is not configured', { status: 500 });
	}

	const object = await bucket.get(key);

	if (!object) {
		return new Response('Not found', { status: 404 });
	}

	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set('ETag', object.httpEtag);

	if (!headers.has('Cache-Control')) {
		headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	}

	return new Response(object.body, { headers });
};
