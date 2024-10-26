import { NextRequest, NextResponse } from 'next/server';
import { signToken } from './lib/utils/crypto';

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - pokemon (pokemon images)
		 * - *.opengraph-image (opengraph image)
		 */
		{
			source:
				'/((?!download|_next/static|_next/image|favicon.ico|pwa|img|pokemon|.*opengraph-image$).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' }
			]
		}
	]
};

const SECRET = new TextEncoder().encode(process.env.PRIVATE_DOWNLOAD_KEY);

const allowedOrigins = ['https://wave.webaim.org'];

export async function middleware(request: NextRequest) {
	const IS_DEV = process.env.NODE_ENV === 'development';
	const cspHeader = IS_DEV
		? ''
		: `default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        object-src 'none';
        base-uri 'none';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
        trusted-types default dompurify nextjs#bundler;
        require-trusted-types-for 'script';`
				.replace(/\s+/g, ' ')
				.trim();

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

	// Regex to match routes like /thoughts/[slug] but exclude /download
	const THOUGHTS_REGEX = /^\/thoughts\/([^/]+)(?!\/download)$/;
	const match = request.nextUrl.pathname.match(THOUGHTS_REGEX);
	if (match) {
		const VALID_FOR = 10; // minutes

		const slug = match[1];
		const expiresAt = Date.now() + VALID_FOR * 60 * 1000;
		const tokenData = `${slug}:${expiresAt}`;
		const signedToken = await signToken(tokenData, SECRET);

		const path = request.nextUrl.pathname + `/download`;

		response.cookies.set(`token`, `${expiresAt}_${signedToken}`, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: VALID_FOR * 60, // 10 minute expiration
			path: path // Cookie applies only to the download route
		});
	}

	return response;
}
