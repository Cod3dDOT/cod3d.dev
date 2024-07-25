import './styles/globals.css';
import './styles/glitch.css';

import { WebSite, WithContext } from 'schema-dts';

import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { Cursor } from '@/components/cursor';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { NavigationContainerPreview } from '@/components/navigation/container/preview';
import '@/lib/trustedTypes';
import { Suspense } from 'react';
import Navigation from '@/components/navigation';
import Script from 'next/script';

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
				url: '/og.webp',
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
				url: '/og.webp',
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
		<html lang="en" className="scrollbar-thin">
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
					{children}
					<Cursor />
					<Suspense fallback={<NavigationContainerPreview />}>
						<Navigation />
					</Suspense>
				</ThemeProvider>

				<Script
					defer
					src="/cl.js"
					data-cf-beacon='{"token": "47d8843e086d4c2892e9dc1dda82ea11"}'
				/>
				<Script
					integrity="sha256-6lqB9Ygbzi0wO4IM0J1KCpaYEpW1FhaT5YlCocflnyg="
					crossOrigin="anonymous"
					defer
					src="/um.js"
					data-website-id="769f6be6-7f1e-4a6b-a214-7734c116c541"
					data-domains="cod3d.dev"
					data-host-url="https://cod3d.dev"
				/>
			</body>
		</html>
	);
}
