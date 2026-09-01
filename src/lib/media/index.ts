export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES: Record<string, string> = {
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/gif': 'gif',
	'image/avif': 'avif',
	'image/svg+xml': 'svg'
};

/** Keys must stay in this shape so the public /media route can trust them. */
export const MEDIA_KEY_PATTERN = /^articles\/[a-z0-9-]+\/[a-z0-9-]+\.[a-z0-9]+$/;

export function buildMediaKey(articleId: string, contentType: string): string | null {
	const extension = ALLOWED_IMAGE_TYPES[contentType];
	if (!extension) return null;

	return `articles/${articleId}/${crypto.randomUUID()}.${extension}`;
}

/**
 * The site runs with `trailingSlash: 'always'`, so the media route only
 * matches the slashed form. Media URLs must carry the trailing slash or the
 * request 404s.
 */
export function mediaUrlForKey(key: string): string {
	return `/media/${key}/`;
}

/** Add the required trailing slash to media URLs stored before that rule. */
export function normalizeMediaUrl(url: string): string {
	if (!url.startsWith('/media/') || url.endsWith('/')) return url;
	return `${url}/`;
}
