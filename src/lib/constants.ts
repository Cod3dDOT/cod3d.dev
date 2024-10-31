const _host = () => {
	const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

	if (vercelUrl) return 'https://' + vercelUrl;

	return process.env.HOST || 'http://localhost:3000';
};

const _env = () => {
	const vercel_env = process.env.VERCEL_ENV;
	const node_env = process.env.NODE_ENV;

	switch (vercel_env) {
		case 'production':
			return 'v-prod';
		case 'development':
			return 'v-dev';
		case 'preview':
			return 'v-preview';
	}

	if (node_env == 'production') {
		return 'l-prod';
	}

	if (node_env == 'development') {
		return 'l-dev';
	}

	return 'unknown';
};

export const ENV = _env();
export const HOST = _host();
export const POCKETBASE_HOST = 'https://' + process.env.POCKETBASE_HOST;
