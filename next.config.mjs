import withBundleAnalyzer from '@next/bundle-analyzer';

const IS_DEV = process.env.NODE_ENV === 'development';
const cspHeader = `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; object-src 'none'; connect-src 'self' https://cloudflareinsights.com/; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests; trusted-types default nextjs#bundler;`;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		ppr: true
	},
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
				source: '/cl.js',
				destination: 'https://static.cloudflareinsights.com/beacon.min.js'
			},
			{
				source: '/api/files/:path*',
				destination: 'https://cod3d.pockethost.io/api/files/:path*'
			}
		];
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: IS_DEV ? '' : cspHeader
					},
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
						key: 'Access-Control-Allow-Origin',
						value: 'cod3d.dev'
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
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cod3d.pockethost.io',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'cod3d.dev',
				port: '',
				pathname: '/**'
			}
		]
	}
};

const withBundleAnalyzerConfig = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
});

export default withBundleAnalyzerConfig(nextConfig);
