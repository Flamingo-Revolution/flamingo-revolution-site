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

declare module 'cloudflare:workers' {
	const env: {
		readonly DATABASE_URL?: string;
		readonly DISCORD_WEBHOOK_URL?: string;
	};
}
