import Link from 'next/link';

import ChevronIcon from '@/components/icons/chevron';
import { ThoughtBody } from '@/components/pages/thoughts/thought/body';
import { TableofContents } from '@/components/pages/thoughts/thought/tableOfContents';
import { getThought } from '@/lib/pocketbase/req';
import { getNonce } from '@/lib/nonce';
import { ReactLenis } from '@/lib/lenis';
import { Footer } from '@/components/footer';
import clsx from 'clsx';
import BackIcon from '@/components/icons/back';

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

const BackLink: React.FC = () => {
	return (
		<Link
			href="/thoughts"
			className="flex items-center space-x-2 mb-8 group hover:underline"
		>
			<BackIcon className="h-full aspect-square" />
			<span>All thoughts</span>
		</Link>
	);
};

export default async function Page({ params }: { params: { slug: string } }) {
	const thought = await getThought(params.slug);

	return (
		<ReactLenis root>
			<main
				className={
					'bg-background md:px-24 px-10 relative xl:flex sm:pt-24 py-8 font-sans'
				}
			>
				{/* <TableofContents className="sticky top-24 self-start h-auto" /> */}
				<div className="max-w-[80ch] mx-auto container">
					<BackLink />
					<article
						className={clsx(
							'prose lg:prose-lg prose-neutral max-w-none dark:prose-invert',
							'prose-headings:font-semibold',
							'prose-img:w-full prose-img:rounded-xl',
							'prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:transition-colors',
							'prose-pre:bg-background-dark prose-pre:text-current',
							'pb-8'
						)}
					>
						<h1 className="md:w-4/5">{thought.name}</h1>
						<ThoughtBody thought={thought} />
					</article>

					<BackLink />
				</div>
			</main>
			<Footer />
		</ReactLenis>
	);
}
