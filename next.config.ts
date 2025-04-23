import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const CSP = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' blob:;
  style-src 'self' 'unsafe-inline';
  object-src 'none';
  base-uri 'none';
  form-action 'self';
  img-src 'self' data:;
  frame-ancestors 'none';
  worker-src blob:;
  upgrade-insecure-requests;
  trusted-types default dompurify nextjs#bundler;
  require-trusted-types-for 'script';
`
	.replace(/\s{2,}/g, " ")
	.trim();

const nextConfig: NextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		// viewTransition: true, // FIXME not actually implemented
		// ppr: true // FIXME Investigate: makes every navigation reload the page? weird and broken
	},
	images: {
		unoptimized: true,
		contentDispositionType: "attachment"
	},
	async rewrites() {
		return Promise.resolve([
			{
				source: "/um.js",
				destination: "https://analytics.umami.is/script.js"
			},
			{
				source: "/api/send",
				destination: "https://api-gateway.umami.dev/api/send"
			},
			{
				source: "/api/files/:path*",
				destination: `https://${process.env.POCKETBASE_HOST}/api/files/:path*`
			}
		]);
	},
	async headers() {
		return Promise.resolve([
			{
				source:
					"/((?!api|_next/static|_next/image|favicon.ico|pwa|img|pokemon|.*opengraph-image$).*)",
				headers: [
					{
						key: "Referrer-Policy",
						value: "same-origin"
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff"
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload"
					},
					{
						key: "Permissions-Policy",
						value:
							"fullscreen=(self),picture-in-picture=(self),clipboard-write=(self),attribution-reporting=(self),compute-pressure=(self),accelerometer=(),autoplay=(),bluetooth=(),browsing-topics=(),camera=(),display-capture=(),gamepad=(),geolocation=(),gyroscope=(),hid=(),magnetometer=(),microphone=(),midi=(),otp-credentials=(),payment=(),serial=(),usb=(),xr-spatial-tracking=()"
					},
					{
						key: "Cross-Origin-Embedder-Policy", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
						value: "require-corp"
					},
					{
						key: "Cross-Origin-Opener-Policy", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
						value: "same-origin"
					},
					{
						key: "Cross-Origin-Resource-Policy", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
						value: "cross-origin"
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS"
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization"
					},
					{
						key: "Access-Control-Allow-Origin",
						value: "https://wave.webaim.org"
					},
					{
						key: "Access-Control-Allow-Credentials",
						value: "true"
					},
					...(isProd
						? [
								{
									key: "Content-Security-Policy",
									value: CSP
								}
							]
						: [])
				]
			}
		]);
	}
};

const analyzedConfig = withBundleAnalyzer({
	enabled: process.env.ANALYZE === "true"
})(nextConfig);

export default process.env.ANALYZE === "true" ? analyzedConfig : nextConfig;
