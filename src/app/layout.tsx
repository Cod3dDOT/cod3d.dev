import "@/styles/index.css";
import "@/lib/trustedTypes";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Pixelify_Sans } from "next/font/google";
import Script from "next/script";

import { Navigation } from "@/components/navigation";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils/cn";

const font = Pixelify_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-pixelify"
});

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#fff" },
		{ media: "(prefers-color-scheme: dark)", color: "#222" }
	],
	colorScheme: "dark light"
};

export const metadata: Metadata = {
	metadataBase: new URL("https://cod3d.dev"), // takes effect only in production
	title: "cod3d's den",
	description: "Probably trying to hack you. Or sleeping. Or both.",
	creator: "cod3d",
	keywords: ["blog", "projects", "coding", "Next.js"],
	referrer: "same-origin",
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/"
		},
		types: {
			"application/rss+xml": "https://cod3d.dev/feed.xml"
		}
	},
	robots: {
		index: true,
		follow: true,
		noarchive: true,
		nosnippet: false,
		noimageindex: false
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://cod3d.dev",
		title: "cod3d's den",
		description: "Probably trying to hack you. Or sleeping. Or both.",
		siteName: "cod3d's den",
		images: [
			{
				url: "/img/og/og.webp",
				width: 1200,
				height: 675,
				alt: "cod3d"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "cod3d's den",
		description: "Probably trying to hack you. Or sleeping. Or both.",
		creator: "@cod3ddot",
		site: "cod3d's den",
		images: {
			url: "https://cod3d.dev/img/og/og.webp", // Must be an absolute URL
			alt: "cod3d"
		}
	},
	verification: {}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			dir="ltr"
			className="scheme-light dark:scheme-dark"
			suppressHydrationWarning
		>
			<body
				className={cn(
					font.variable,
					GeistSans.variable,
					GeistMono.variable,
					"font-pixelify"
				)}
			>
				<Providers>
					{children}
					{/* make sure that navigation, which has headings, stays behind main content */}
					<Navigation />
				</Providers>

				<Script
					integrity="sha512-IB8Fjoii8wY2Az42+ef7f03eWt4ILMGoEDuMuaCWg0kD5lQaHIbw6NPtPgSwIxYZyM1mBYKICqyvaNYz5WcMbg=="
					crossOrigin="anonymous"
					strategy="afterInteractive"
					async
					src="/um.js"
					data-website-id="769f6be6-7f1e-4a6b-a214-7734c116c541"
					data-domains="cod3d.dev"
					data-host-url="https://cod3d.dev"
				/>
			</body>
		</html>
	);
}
