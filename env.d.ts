declare global {
	namespace NodeJS {
		interface ProcessEnv {
			POCKETBASE_HOST: string;
			POCKETBASE_USER: string;
			POCKETBASE_PASS: string;
			PRIVATE_DOWNLOAD_KEY: string;
			NEXT_PUBLIC_URL: string;
		}
	}
}

export {};
