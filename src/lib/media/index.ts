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

export function mediaUrlForKey(key: string): string {
	return `/media/${key}`;
}
