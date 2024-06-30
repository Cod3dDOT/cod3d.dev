import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/um.js',
				destination: 'https://analytics.umami.is/script.js'
			},
			{
				source: '/api/send',
				destination: 'https://api-gateway.umami.dev/api/send'
			}
		];
	},
	async headers() {
		return [
			{
				source: '/(.*)',
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
