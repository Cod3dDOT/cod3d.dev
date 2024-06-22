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
			source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
			missing: [
				{ type: 'header', key: 'next-router-prefetch' },
				{ type: 'header', key: 'purpose', value: 'prefetch' }
			]
		}
	]
};

function CORS(request: NextRequest, response: NextResponse) {
	const allowedOrigins = [
		'https://cod3d.dev',
		'https://github.com',
		'https://api-gateway.umami.dev'
	];

	const corsOptions = {
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization'
	};

	// Check the origin from the request
	const origin = request.headers.get('origin') ?? '';
	const isAllowedOrigin = allowedOrigins.includes(origin);

	// Handle preflighted requests
	const isPreflight = request.method === 'OPTIONS';

	if (isPreflight) {
		const preflightHeaders = {
			...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
			...corsOptions
		};
		return NextResponse.json({}, { headers: preflightHeaders });
	}

	if (isAllowedOrigin) {
		response.headers.set('Access-Control-Allow-Origin', origin);
	}

	Object.entries(corsOptions).forEach(([key, value]) => {
		response.headers.set(key, value);
	});

	return response;
}

function CSP(request: NextRequest) {
	const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

	const isThought = request.url.includes('/thoughts/');

	const hashes = {
		script: [
			"'sha256-eMuh8xiwcX72rRYNAGENurQBAcH7kLlAUQcoOri3BIo='", //json-ld inline script
			"'sha256-RrWaxIcrjb6FTcxav9mgXg/7RKhvienU87nevi8qpKg='", //cloudlflare email-encoder
			process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ''
		],
		// unsafe-inline will override nonce and any hashes
		style:
			process.env.NODE_ENV === 'development' || isThought
				? ["'unsafe-inline'"]
				: [
						`'nonce-${nonce}'`,

						//footer
						"'sha256-cbdgHi49NQWXKrQAlzIdJuUjKp/JnAE93qCecbNKEyM='",

						// thoughts
						"'sha256-OTVileWRHQBTssRl6xTJoqzuFy52bistW+wWChzVKKw='",
						"'sha256-OXJWNkqOzUVYLtMkGQ9uevLQsgCZb/Y+Q6ypWpD5ai8='",
						"'sha256-3EP1piOo/O4YWqWO7mQYW6fCsMcX8uB/C/w3Cgomac4='",
						"'sha256-YgvMKfdTn4s8rWkq5cXyxs8ggVxB3FbMNm2Wa8gzeqw='",

						// homepage
						"'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk='",
						"'sha256-dZv43Imcg9IVVs8F3qa/uhalpu/jln6PcUJZMQ4DvVE='",
						"'sha256-hAzIRge8oAVjQrNQXCLPHz2EJBL/qfRFUzcgyiM8D3w='",
						"'sha256-PFl9s1E8wF/yrLwhmN50lEd077pu6W7ug0RNFqwmURc='",
						"'sha256-bjO9gy2GfmNK8gqrAZ6mhy6lctqH9pUfyQTGM0iHIqk='",
						"'sha256-tTgjrFAQDNcRW/9ebtwfDewCTgZMFnKpGa9tcHFyvcs='"
					]
	};

	const cspHeader = `
        default-src 'self';
        connect-src 'self' api-gateway.umami.dev;
        script-src 'self' cod3d.dev 'nonce-${nonce}' 'strict-dynamic' ${hashes.script.join(' ')};
        style-src 'self' ${hashes.style.join(' ')} 'unsafe-hashes';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `;

	// Replace newline characters and spaces
	const contentSecurityPolicyHeaderValue = cspHeader
		.replace(/\s{2,}/g, ' ')
		.trim();

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-nonce', nonce);

	requestHeaders.set(
		'Content-Security-Policy',
		contentSecurityPolicyHeaderValue
	);

	const response = NextResponse.next({
		request: {
			headers: requestHeaders
		}
	});

	response.headers.set(
		'Content-Security-Policy',
		contentSecurityPolicyHeaderValue
	);

	return response;
}

function PERMISSIONS(response: NextResponse) {
	response.headers.set(
		'Permissions-Policy',
		'fullscreen=(self),picture-in-picture=(self),clipboard-write=(self),attribution-reporting=(self),compute-pressure=(self),' +
			'accelerometer=(),autoplay=(),bluetooth=(),browsing-topics=(),' +
			'camera=(),display-capture=(),gamepad=(),geolocation=(),gyroscope=(),hid=(),magnetometer=(),microphone=(),' +
			'midi=(),otp-credentials=(),payment=(),serial=(),usb=(),xr-spatial-tracking=()'
	);
	return response;
}

export function middleware(request: NextRequest) {
	const withCSP = CSP(request);
	const withCORS = CORS(request, withCSP);
	const withPermissions = PERMISSIONS(withCORS);
	return withPermissions;
}
