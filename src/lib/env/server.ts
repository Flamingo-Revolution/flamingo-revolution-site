import { env } from 'cloudflare:workers';

export function getDatabaseUrl(): string {
	return typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
}

export function getDiscordWebhookUrl(): string {
	return typeof env.DISCORD_WEBHOOK_URL === 'string' ? env.DISCORD_WEBHOOK_URL : '';
}

export function getMediaBucket(): R2Bucket | null {
	return env.MEDIA ?? null;
}
