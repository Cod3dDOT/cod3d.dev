import { NextRequest, NextResponse } from 'next/server';
import { CSP } from './lib/middleware/csp';
import { CORS, CORS_PREFLIGHT } from './lib/middleware/cors';
import { PERMISSIONS } from './lib/middleware/permissions';
import { REWRITES } from './lib/middleware/rewrites';

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

	// Handle preflighted requests
	const isPreflight = request.method === 'OPTIONS';
	if (isPreflight) {
		const withCORS = CORS_PREFLIGHT(request.headers, customResponseHeaders);
		return NextResponse.json({}, { headers: withCORS.responseHeaders });
	}

	const rewrite = REWRITES(request);
	if (rewrite.rewrite) {
		if (rewrite.destination === 'not-found') {
			return NextResponse.next({
				status: 404
			});
		}
		return NextResponse.redirect(rewrite.destination);
	}

	const withCSP = CSP(request.headers, customResponseHeaders);
	const withCORS = CORS(withCSP.requestHeaders, withCSP.responseHeaders);
	const withPermissions = PERMISSIONS(
		withCORS.requestHeaders,
		withCORS.responseHeaders
	);

	// we now have collected all desired request/response headers
	const response = NextResponse.next({
		request: {
			headers: withPermissions.requestHeaders
		}
	});
	for (const [key, value] of withPermissions.responseHeaders) {
		response.headers.set(key, value);
	}

	return response;
}
