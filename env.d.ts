declare global {
	namespace NodeJS {
		interface ProcessEnv {
			POCKETBASE_HOST: string;
			POCKETBASE_USER: string;
			POCKETBASE_PASS: string;
			PRIVATE_DOWNLOAD_KEY: string;
			SITE_URL: string;
			SITE_NAME: string;
		}
	}
}

export {};
