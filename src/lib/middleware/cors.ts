import { NextResponse } from 'next/server';
import { middlewareFunctionReturn } from '.';

const CORS_ORIGINS = ['https://cod3d.dev'];

const CORS_HEADERS = {
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

const IS_ALLOWED_ORIGIN = (requestHeaders: Headers) => {
	const origin = requestHeaders.get('origin') ?? '';
	return CORS_ORIGINS.includes(origin);
};

export function CORS_PREFLIGHT(
	requestHeaders: Headers,
	responseHeaders: Headers
): middlewareFunctionReturn {
	const isAllowedOrigin = IS_ALLOWED_ORIGIN(requestHeaders);

	if (isAllowedOrigin) {
		responseHeaders.set('Access-Control-Allow-Origin', origin);
	}

	Object.entries(CORS_HEADERS).forEach(([key, value]) => {
		responseHeaders.set(key, value);
	});

	return {
		requestHeaders,
		responseHeaders
	};
}

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

	Object.entries(CORS_HEADERS).forEach(([key, value]) => {
		responseHeaders.set(key, value);
	});

	return {
		requestHeaders,
		responseHeaders
	};
}
