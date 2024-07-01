import { Metadata } from 'next';

import { ThoughtsTextReveal } from '@/components/pages/thoughts/textReveal';
import { Years } from '@/components/pages/thoughts/years';
import { getThoughts } from '@/lib/pocketbase/req';
import { ReactLenis } from '@/lib/lenis';
import { Footer } from '@/components/footer';
import { isError } from '@/lib/pocketbase/utils';
import { Thought } from '@/lib/pocketbase/types';
import { PageError } from '@/components/error';

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

// revalidate at most every 2 hours, in seconds
export const revalidate = 7200;

const ThoughtsPage: React.FC = async () => {
	const thoughtsResponse = await getThoughts(1, 20);

	if (isError(thoughtsResponse)) {
		return <PageError />;
	}

	const thoughts = thoughtsResponse as Thought[];

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
