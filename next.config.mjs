import withBundleStats from 'next-plugin-bundle-stats';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		formats: ['image/avif', 'image/webp'],
		contentDispositionType: 'attachment',
		remotePatterns: []
	},
	// experimental: {
	// 	ppr: true
	// },
	async rewrites() {
		return [
			{
				source: '/um.js',
				destination: 'https://analytics.umami.is/script.js'
			},
			{
				source: '/api/send',
				destination: 'https://api-gateway.umami.dev/api/send'
			},
			{
				source: '/api/cf',
				destination: 'https://cloudflareinsights.com/cdn-cgi/rum'
			},
			{
				source: '/api/files/:path*',
				destination: `https://${process.env.POCKETBASE_HOST}/api/files/:path*`
			}
		];
	},
	async headers() {
		return [
			{
				source:
					'/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|icons/*).*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY'
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block'
					},
					{
						key: 'Referrer-Policy',
						value: 'same-origin'
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff'
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload'
					},
					{
						key: 'Permissions-Policy',
						value:
							'fullscreen=(self),picture-in-picture=(self),clipboard-write=(self),attribution-reporting=(self),compute-pressure=(self),accelerometer=(),autoplay=(),bluetooth=(),browsing-topics=(),camera=(),display-capture=(),gamepad=(),geolocation=(),gyroscope=(),hid=(),magnetometer=(),microphone=(),midi=(),otp-credentials=(),payment=(),serial=(),usb=(),xr-spatial-tracking=()'
					},
					{
						key: 'Cross-Origin-Embedder-Policy', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
						value: 'require-corp'
					},
					{
						key: 'Cross-Origin-Opener-Policy', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
						value: 'same-origin'
					},
					{
						key: 'Cross-Origin-Resource-Policy', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
						value: 'cross-origin'
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, PUT, DELETE, OPTIONS'
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type, Authorization'
					}
				]
			}
		];
	}
};

const withStats = process.env.ANALYZE === 'true';
const config = withStats
	? withBundleStats({ outDir: '../.bundle-stats/', json: true }, nextConfig)
	: nextConfig;

export default config;
