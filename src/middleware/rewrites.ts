import { NextRequest, NextResponse, userAgent } from 'next/server';

type Rewrite = {
	rewrite: boolean;
	destination: URL | 'not-found';
};

export const REWRITES = (request: NextRequest): Rewrite => {
	const url = request.nextUrl;
	const { device } = userAgent(request);
	const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

	// rewrite /hello to /404 if mobile
	if (url.pathname === '/hello' && viewport === 'mobile') {
		return { rewrite: false, destination: 'not-found' };
	}

	return { rewrite: false, destination: new URL('/', request.url) };
};
