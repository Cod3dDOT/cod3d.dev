import { Metadata } from 'next';

import { ThoughtsTextReveal } from '@/components/pages/thoughts/textReveal';
import { Years } from '@/components/pages/thoughts/years';
import { getThoughts } from '@/lib/pocketbase/req';
import { ReactLenis } from '@/lib/lenis';
import { Footer } from '@/components/footer';
import { getNonce } from '@/lib/nonce';
import { headers } from 'next/headers';

export const metadata: Metadata = {
	title: "cod3d's thoughts",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	creator: 'cod3d',
	keywords: 'blog, projects, coding',
	robots: 'index, nofollow',
	openGraph: {
		type: 'website',
		url: 'https://cod3d.dev',
		title: "cod3d's thoughts",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		siteName: "cod3d's den",
		images: [
			{
				url: '/og.webp'
			}
		]
	}
};

const ThoughtsPage: React.FC = async () => {
	const thoughts = await getThoughts(1, 20);

	return (
		<ReactLenis root>
			<main className="bg-background md:px-24 px-10 relative">
				<ThoughtsTextReveal />
				<Years thoughts={thoughts} />
			</main>
			<Footer />
		</ReactLenis>
	);
};

export default ThoughtsPage;
