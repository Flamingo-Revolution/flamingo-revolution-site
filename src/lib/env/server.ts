import { env } from 'cloudflare:workers';

export function getDatabaseUrl(): string {
	return typeof env.DATABASE_URL === 'string' ? env.DATABASE_URL : '';
}
