import './styles/globals.css';
import './styles/grainy.css';
import './styles/glitch.css';

import type { Metadata } from 'next';
import { Pixelify_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import Cursor from './components/cursor';
import { Navigation } from './components/navigation';
import NavBlogShowcase from './components/navigation/blog';
import NavContactsShowcase from './components/navigation/contacts';
import NavProjectsShowcase from './components/navigation/projects';
import Transitions, { Animate } from './components/transitions';

const font = Pixelify_Sans({
	subsets: ['latin'],
	variable: '--font-pixelify'
});

export const metadata: Metadata = {
	metadataBase: new URL('https://cod3d.dev'), // takes effect only in prod
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
			<body className={font.className}>
				<ThemeProvider attribute="class">
					<Cursor
						interactables={[
							{ target: '.cursor', size: 'both' },
							{
								target: '.cursor-width',
								size: 'width'
							},
							{
								target: '.cursor-height',
								size: 'height',
								snap: 'vertical'
							}
						]}
						showSystemCursor={false}
						snap="center"
					/>
					<Transitions>
						<Animate>{children}</Animate>
					</Transitions>
					<Navigation>
						<NavBlogShowcase />
						<NavProjectsShowcase />
						<NavContactsShowcase />
					</Navigation>
					<svg className="absolute left-0 top-0">
						<filter id="noiseFilter-dark">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.6"
								stitchTiles="stitch"
							/>
							<feColorMatrix
								in="colorNoise"
								type="matrix"
								values="1.0 0.3 0.3 0.0 0.0
                                    0.3 1.0 0.3 0.0 0.0
                                    0.3 0.3 1.0 0.0 0.0
                                    0.0 0.0 0.0 0.1 0.0"
							/>
							<feComposite
								operator="in"
								in2="SourceGraphic"
								result="monoNoise"
							/>
							<feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
						</filter>
						<filter id="noiseFilter-light">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.6"
								stitchTiles="stitch"
							/>
							<feColorMatrix
								in="colorNoise"
								type="matrix"
								values="1.0 0.3 0.3 0.0 0.0
                                    0.3 1.0 0.3 0.0 0.0
                                    0.3 0.3 1.0 0.0 0.0
                                    0.0 0.0 0.0 0.9 0.0"
							/>
							<feComposite
								operator="in"
								in2="SourceGraphic"
								result="monoNoise"
							/>
							<feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
						</filter>
					</svg>
				</ThemeProvider>
			</body>
		</html>
	);
}
