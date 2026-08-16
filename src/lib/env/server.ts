import { env } from 'cloudflare:workers';

export function getDatabaseUrl(): string {
	return typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
}

export function getMediaBucket(): R2Bucket | null {
	return env.MEDIA ?? null;
}
