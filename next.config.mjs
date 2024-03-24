/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
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
