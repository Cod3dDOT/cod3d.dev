/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import "@/styles/index.css";
import "@/lib/trustedTypes";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Pixelify_Sans } from "next/font/google";
import Script from "next/script";

import { Navigation } from "@/components/navigation";
import { cn } from "@/lib/utils/cn";
import { Providers } from "./providers";

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
	metadataBase: new URL(process.env.SITE_URL), // takes effect only in production
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
			"application/rss+xml": `${process.env.SITE_URL}/feed.xml`
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
		url: process.env.SITE_URL,
		title: process.env.SITE_NAME,
		description: "Probably trying to hack you. Or sleeping. Or both.",
		siteName: process.env.SITE_NAME,
		images: [
			{
				url: `${process.env.SITE_URL}/img/og/og.webp`,
				width: 1200,
				height: 675,
				alt: process.env.SITE_NAME
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: process.env.SITE_NAME,
		description: "Probably trying to hack you. Or sleeping. Or both.",
		creator: "@cod3ddot",
		site: process.env.SITE_URL,
		images: {
			url: `${process.env.SITE_URL}/img/og/og.webp`, // Must be an absolute URL
			alt: process.env.SITE_NAME
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
					integrity="sha512-NvB9p2Vwo7N0RayKFcrkBianZoWfZwZelGXZX0YtGBqFGHDYqgSIELjXCKL8zRalkGUHpxI5BNDlwcFu56A9Mw=="
					crossOrigin="anonymous"
					strategy="lazyOnload"
					async
					src="/um.js"
					data-website-id="769f6be6-7f1e-4a6b-a214-7734c116c541"
					data-host-url={process.env.SITE_URL}
				/>
			</body>
		</html>
	);
}
