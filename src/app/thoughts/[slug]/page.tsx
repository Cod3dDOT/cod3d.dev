import Link from 'next/link';

import ChevronIcon from '@/components/icons/chevron';
import { ThoughtBody } from '@/components/pages/thoughts/thought/body';
import { TableofContents } from '@/components/pages/thoughts/thought/tableOfContents';
import { getThought } from '@/lib/pocketbase/req';

export async function generateMetadata({
	params
}: {
	params: { slug: string };
}) {
	const thought = await getThought(params.slug);

	return {
		title: "cod3d's thoughts",
		description: thought.name,
		openGraph: {
			type: 'website',
			url: 'https://cod3d.dev',
			title: "cod3d's thoughts",
			description: thought.name,
			siteName: "cod3d's den"
		}
	};
}

export default async function Page({ params }: { params: { slug: string } }) {
	const thought = await getThought(params.slug);

	return (
		<div className="relative xl:flex sm:mt-24 mt-8">
			<TableofContents className="sticky top-24 self-start block h-auto" />
			<div className="max-w-[100ch] mx-auto">
				<Link href={'/thoughts'} className="flex items-center space-x-2 mb-8">
					<ChevronIcon className="h-full aspect-square fill-foreground rotate-180" />
					<span>Back to thoughts</span>
				</Link>

				<article className="prose max-w-full dark:prose-invert prose-img:w-full">
					<h1 className="md:w-4/5">{thought.name}</h1>
					<ThoughtBody thought={thought} />
				</article>
			</div>
		</div>
	);
}
