/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cod3d.pockethost.io',
				port: '',
				pathname: '/**'
			}
		]
	}
};

import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzerConfig = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
});

export default withBundleAnalyzerConfig(nextConfig);
