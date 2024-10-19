import { NextRequest, NextResponse } from 'next/server';

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico|pokemon).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' }
			]
		}
	]
};

const allowedOrigins = ['https://wave.webaim.org'];

export function middleware(request: NextRequest) {
	const IS_DEV = process.env.NODE_ENV === 'development';
	const cspHeader = IS_DEV
		? ''
		: `default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self';
        font-src 'self';
        object-src 'none';
        connect-src 'self';
        base-uri 'none';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
        trusted-types default nextjs#bundler;`.replaceAll('\n', ' ');

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('Content-Security-Policy', cspHeader);

	const origin = request.headers.get('origin') ?? '';
	const isAllowedOrigin = allowedOrigins.includes(origin);

	const isPreflight = request.method === 'OPTIONS';
	if (isPreflight) {
		const preflightHeaders = {
			...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin })
		};
		return NextResponse.json({}, { headers: preflightHeaders });
	}

	const response = NextResponse.next({
		request: {
			headers: requestHeaders
		}
	});

	response.headers.set('Content-Security-Policy', cspHeader);
	if (isAllowedOrigin) {
		response.headers.set('Access-Control-Allow-Origin', origin);
	}

	return response;
}
