import { Metadata } from 'next';

import { ThoughtsBody } from '@/components/pages/thoughts';
import { pb } from '@/lib/pocketbase/config';

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

async function getThoughts() {
	return (
		await pb.collection('thoughts').getList(1, 20, {
			sort: 'created'
		})
	).items;
}

const ThoughtsPage: React.FC = async () => {
	const thoughts = await getThoughts();
	return <ThoughtsBody thoughts={thoughts} />;
};

export default ThoughtsPage;
