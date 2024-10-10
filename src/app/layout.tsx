import './styles/globals.css';
import '@/lib/trustedTypes';

import clsx from 'clsx';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { ViewTransitions } from 'next-view-transitions';
import { Suspense } from 'react';
import { WebSite, WithContext } from 'schema-dts';

import { Cursor } from '@/components/cursor';
import Navigation from '@/components/navigation';
import { NavigationContainerPreview } from '@/components/navigation/container/preview';

const font = Pixelify_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-pixelify'
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fff' },
		{ media: '(prefers-color-scheme: dark)', color: '#222' }
	],
	colorScheme: 'dark light'
};

export const metadata: Metadata = {
	metadataBase: new URL('https://cod3d.dev'), // takes effect only in production
	title: "cod3d's den",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	creator: 'cod3d',
	keywords: 'blog, projects, coding',
	alternates: {
		canonical: 'https://cod3d.dev'
	},
	robots: {
		index: true,
		follow: true,
		noarchive: true,
		nosnippet: false,
		noimageindex: false
	},
	openGraph: {
		type: 'website',
		url: 'https://cod3d.dev',
		title: "cod3d's den",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		siteName: "cod3d's den",
		images: [
			{
				url: '/img/og/og.webp',
				width: 1200,
				height: 675,
				alt: 'cod3d'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: "cod3d's den",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		creator: '@cod3ddot',
		site: "cod3d's den",
		images: [
			{
				url: '/img/og/og.webp',
				width: 1200,
				height: 675,
				alt: 'cod3d'
			}
		]
	}
};

const jsonLd: WithContext<WebSite> = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: "cod3d's den | A place where I try, fail, and learn.",
	url: 'cod3d.dev',
	image: 'https://cod3d.dev/og.png',
	description: 'Probably trying to hack you. Or sleeping. Or both.'
};

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html
				lang="en"
				className="scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground"
			>
				<body
					className={clsx(
						font.variable,
						GeistSans.variable,
						GeistMono.variable,
						'font-pixelify cursor-none'
					)}
				>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
					/>

					<ThemeProvider attribute="class">
						<Cursor />
						{children}
						<Suspense fallback={<NavigationContainerPreview />}>
							<Navigation />
						</Suspense>
					</ThemeProvider>

					<Script
						integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
						crossOrigin="anonymous"
						strategy="afterInteractive"
						src="/cl.js"
						data-cf-beacon='{"token": "47d8843e086d4c2892e9dc1dda82ea11"}'
					/>
					<Script
						integrity="sha512-JyQHWOBVarMJFNIkFUtJLxQDEOyB7e9V/MnwpSsRw5ryTUVUveuaUwb5JTSbvUXsTa4PJW1SKFTJw85uDt4DwQ== sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg== sha512-FGTnKDAoE776tp3VSR7Z8isyE8Xh38237gCvrH2oRV4uwc9sLxKysDSGFnQnbkheeUpSrZdGzoW+QGBkZB4PNg=="
						crossOrigin="anonymous"
						strategy="afterInteractive"
						src="/um.js"
						data-website-id="769f6be6-7f1e-4a6b-a214-7734c116c541"
						data-domains="cod3d.dev"
						data-host-url="https://cod3d.dev"
					/>
				</body>
			</html>
		</ViewTransitions>
	);
}
