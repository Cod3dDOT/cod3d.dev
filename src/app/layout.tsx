import './styles/globals.css';
import './styles/grainy.css';
import './styles/glitch.css';

import type { Metadata } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import { LibCursor } from '@/components/cursor';
import { GrainyBackground } from '@/components/grainyBackground';
import { Navigation } from '@/components/navigation';
import Transitions, { Animate } from '@/components/transitions';

const font = Pixelify_Sans({
	subsets: ['latin'],
	variable: '--font-pixelify'
});

export const metadata: Metadata = {
	metadataBase: new URL('https://cod3d.dev'), // takes effect only in production
	title: "cod3d's den",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	creator: 'cod3d',
	keywords: 'blog, projects, coding',
	robots: 'index, follow',
	themeColor: '#111111', // remove when updating next-themes to v1.0.0
	openGraph: {
		type: 'website',
		url: 'https://cod3d.dev',
		title: "cod3d's den",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		siteName: "cod3d's den",
		locale: 'en_US',
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
			<body className={font.className}>
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
