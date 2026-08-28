interface ImportMetaEnv {
	readonly POSTGRES_DB: string;
	readonly POSTGRES_USER: string;
	readonly POSTGRES_PASSWORD: string;
	readonly DIRECT_URL: string;
	readonly DATABASE_URL: string;
	readonly DISCORD_WEBHOOK_URL: string;
	readonly APPS_SCRIPT_API_URL: string;
	readonly PUBLIC_UMAMI_SCRIPT: string;
	readonly PUBLIC_UMAMI_DATA_WEBSITE_ID: string;
	readonly PUBLIC_FLAMINGO_BOT_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

/** Minimal structural typing for the R2 bucket binding (no workers-types dependency). */
interface R2HttpMetadata {
	contentType?: string;
	cacheControl?: string;
}

interface R2ObjectBody {
	body: ReadableStream;
	httpEtag: string;
	size: number;
	httpMetadata?: R2HttpMetadata;
	writeHttpMetadata(headers: Headers): void;
}

interface R2Bucket {
	put(
		key: string,
		value: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob,
		options?: { httpMetadata?: R2HttpMetadata }
	): Promise<unknown>;
	get(key: string): Promise<R2ObjectBody | null>;
	delete(key: string | string[]): Promise<void>;
}

declare module 'cloudflare:workers' {
	const env: {
		readonly DATABASE_URL?: string;
		readonly DISCORD_WEBHOOK_URL?: string;
		readonly MEDIA?: R2Bucket;
	};
}
