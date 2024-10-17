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
	keywords: ['blog', 'projects', 'coding', 'Next.js'],
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/'
		},
		types: {
			'application/rss+xml': 'https://cod3d.dev/feed.xml'
		}
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
		locale: 'en_US',
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
		images: {
			url: 'https://cod3d.dev/img/og/og.webp', // Must be an absolute URL
			alt: 'cod3d'
		}
	},
	verification: {}
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
					<ThemeProvider attribute="class">
						<Cursor />
						{children}
						<Suspense fallback={<NavigationContainerPreview />}>
							<Navigation />
						</Suspense>
					</ThemeProvider>

					<Script
						integrity="sha512-KV7Gp97zgMlgMhSVeNLapFRNrByIKoCH75HgC+8t/C9eBP1qFoRh4Ni/Ty2uJGxp8N/rgIyCAlHiHM8eht+lqw== sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
						crossOrigin="anonymous"
						strategy="afterInteractive"
						src="/cl.js"
						data-cf-beacon='{"token": "47d8843e086d4c2892e9dc1dda82ea11"}'
					/>
					<Script
						integrity="sha512-erPxyAEnHOPM9OXtBLQtnrv9TXI/hT1f2iQmnLRO9YtWKe10EGMFeZe1hhqgnYSas4WyLXEK9bmzAmjQNHlT7g=="
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
