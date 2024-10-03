import { Metadata } from 'next';

import { ThoughtsTextReveal } from '@/components/pages/thoughts/textReveal';
import { Years } from '@/components/pages/thoughts/years';
import { getThoughts } from '@/lib/pocketbase/req';
import { ReactLenis } from '@/lib/lenis';
import { isError } from '@/lib/pocketbase/utils';
import { Thought } from '@/lib/pocketbase/types';
import { PageError } from '@/components/error';

import { Footer } from '@/components/footer';

import Image from 'next/image';

import Gif from '@/../public/img/working-on-it.gif';

export const metadata: Metadata = {
	title: "cod3d's projects",
	description: 'Probably trying to hack you. Or sleeping. Or both.',
	creator: 'cod3d',
	keywords: 'blog, projects, coding',
	robots: {
		index: true,
		follow: true,
		noarchive: true,
		nosnippet: false,
		noimageindex: false
	},
	alternates: {
		canonical: 'https://cod3d.dev/thoughts'
	},
	openGraph: {
		type: 'website',
		url: 'https://cod3d.dev/thoughts',
		title: "cod3d's projects",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		siteName: "cod3d's den",
		images: [
			{
				url: '/og.webp'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: "cod3d's projects",
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		creator: '@cod3ddot',
		site: "cod3d's den",
		images: [
			{
				url: '/og.webp',
				width: 1200,
				height: 675,
				alt: "cod3d's den twitter image"
			}
		]
	}
};

// revalidate at most every hour, in seconds
export const revalidate = 3600;
// export const experimental_ppr = true;

const ProjectsPage: React.FC = () => {
	// const thoughtsResponse = await getThoughts(1, 20, { sort: 'created' });

	// if (isError(thoughtsResponse)) {
	// 	return <PageError />;
	// }

	// const thoughts = thoughtsResponse as Thought[];

	return (
		<ReactLenis root>
			<div className="h-screen">
				<main className="h-full bg-background relative md:px-24 px-10">
					<Image
						unoptimized
						src={Gif}
						alt="Working on it gif"
						width={1200}
						height={675}
						className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
					/>
				</main>
				<Footer />
			</div>
		</ReactLenis>
	);
};

export default ProjectsPage;
