import { middlewareFunctionReturn } from '.';

const CORS_ORIGINS = ['https://cod3d.dev'];

const IS_ALLOWED_ORIGIN = (requestHeaders: Headers) => {
	const origin = requestHeaders.get('origin') ?? '';
	return CORS_ORIGINS.includes(origin);
};

export function CORS(
	requestHeaders: Headers,
	responseHeaders: Headers
): middlewareFunctionReturn {
	// Check the origin from the request
	const isAllowedOrigin = IS_ALLOWED_ORIGIN(requestHeaders);

	if (isAllowedOrigin) {
		requestHeaders.set('Access-Control-Allow-Origin', origin);
		requestHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp'); // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
		requestHeaders.set('Cross-Origin-Opener-Policy', 'same-origin'); // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
		requestHeaders.set('Cross-Origin-Resource-Policy', 'same-origin'); // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
	}

	return {
		requestHeaders,
		responseHeaders
	};
}
