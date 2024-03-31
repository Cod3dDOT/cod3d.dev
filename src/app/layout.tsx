import './styles/globals.css';
import './styles/glitch.css';

import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { Cursor } from '@/components/cursor';
import { GrainyBackground } from '@/components/effects/grainyBackground';
import { Navigation } from '@/components/navigation';
import Transitions, { Animate } from '@/components/transitions';

const font = Pixelify_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-pixelify'
});

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: 'var(--background)' // remove when updating next-themes to v1.0.0
};

const jsonLd = {
	'@context': 'https://schema.org/',
	'@type': 'WebSite',
	name: "cod3d's den",
	url: 'cod3d.dev',
	image: 'https://cod3d.dev/og.png',
	description: 'Probably trying to hack you. Or sleeping. Or both.'
};

export const metadata: Metadata = {
	metadataBase: new URL('https://cod3d.dev'), // takes effect only in production
	title: "cod3d's den",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	creator: 'cod3d',
	keywords: 'blog, projects, coding',
	robots: {
		index: true,
		follow: true,
		'max-image-preview': 'large',
		'max-snippet': -1,
		'max-video-preview': -1,
		googleBot: 'index, follow'
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
		// creator: '@cod3ddot',
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

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className="scroll-smooth scrollbar-thin"
		>
			<head>
				<script
					defer
					src="https://analytics.eu.umami.is/script.js"
					data-website-id="769f6be6-7f1e-4a6b-a214-7734c116c541"
				/>
			</head>
			<body className={clsx(font.variable, 'font-pixelify bg-grainy')}>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<ThemeProvider attribute="class">
					<Transitions>
						<GrainyBackground />
						<Cursor />
						<Navigation />
						<Animate>{children}</Animate>
					</Transitions>
				</ThemeProvider>
			</body>
		</html>
	);
}
