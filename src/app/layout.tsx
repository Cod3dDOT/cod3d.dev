import './styles/globals.css';
import './styles/grainy.css';
import './styles/glitch.css';

import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { LibCursor } from '@/components/cursor';
import { GrainyBackground } from '@/components/effects/grainyBackground';
import { Navigation } from '@/components/navigation';
import Transitions, { Animate } from '@/components/transitions';

const font = Pixelify_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-pixelify'
});

export const viewport: Viewport = {
	themeColor: 'var(--background)' // remove when updating next-themes to v1.0.0
};

export const metadata: Metadata = {
	metadataBase: new URL('https://cod3d.dev'), // takes effect only in production
	title: "cod3d's den",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	creator: 'cod3d',
	keywords: 'blog, projects, coding',
	robots: 'index, follow',
	openGraph: {
		type: 'website',
		url: 'https://cod3d.dev',
		title: "cod3d's den",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		siteName: "cod3d's den",
		images: [
			{
				url: '/og.png'
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
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					defer
					src="https://analytics.eu.umami.is/script.js"
					data-website-id="769f6be6-7f1e-4a6b-a214-7734c116c541"
				/>
			</head>
			<body className={clsx(font.variable, 'font-pixelify')}>
				<ThemeProvider attribute="class">
					<GrainyBackground />
					<LibCursor />
					<Navigation />
					<Transitions>
						<Animate>{children}</Animate>
					</Transitions>
				</ThemeProvider>
			</body>
		</html>
	);
}
