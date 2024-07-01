import { NextRequest, NextResponse } from 'next/server';
import { CSP } from './lib/middleware/csp';
import { CORS } from './lib/middleware/cors';

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
			source:
				'/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|manifest|pokemon|icons).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' }
			]
		}
	]
};

export async function middleware(request: NextRequest) {
	const customResponseHeaders = new Headers();

	const withCORS = CORS(request.headers, customResponseHeaders);

	// Handle preflighted requests
	const isPreflight = request.method === 'OPTIONS';
	if (isPreflight) {
		return NextResponse.json({}, { headers: withCORS.responseHeaders });
	}

	const withCSP = CSP(
		request.nextUrl.pathname,
		withCORS.requestHeaders,
		withCORS.responseHeaders
	);

	// we now have collected all desired request/response headers
	const response = NextResponse.next({
		request: {
			headers: withCSP.requestHeaders
		}
	});
	for (const [key, value] of withCSP.responseHeaders) {
		response.headers.set(key, value);
	}

	return response;
}
