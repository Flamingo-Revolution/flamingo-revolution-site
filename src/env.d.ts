interface ImportMetaEnv {
	readonly POSTGRES_DB: string;
	readonly POSTGRES_USER: string;
	readonly POSTGRES_PASSWORD: string;
	readonly DIRECT_URL: string;
	readonly DATABASE_URL: string;
	readonly APPS_SCRIPT_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "cloudflare:workers" {
	const env: {
		readonly DATABASE_URL?: string;
	};
}
