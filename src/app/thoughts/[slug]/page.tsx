import Link from 'next/link';

import { ThoughtBody } from '@/components/pages/thoughts/thought/body';
import { TableofContents } from '@/components/pages/thoughts/thought/tableOfContents';
import { getThought } from '@/lib/pocketbase/req';
import { ReactLenis } from '@/lib/lenis';
import { Footer } from '@/components/footer';
import clsx from 'clsx';
import BackIcon from '@/components/icons/back';

import Image from 'next/image';
import readingTime from '@/lib/readingTime';

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
			className="flex w-fit items-center space-x-2 mb-8 group hover:underline"
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
				<div className="relative block mx-auto container">
					<BackLink />
					<article
						className={clsx(
							'prose lg:prose-xl prose-neutral max-w-none dark:prose-invert',
							'prose-headings:font-semibold',
							'prose-img:w-full prose-img:rounded-xl',
							'prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:transition-colors',
							'prose-pre:bg-background-dark prose-pre:text-current',
							'pb-8'
						)}
					>
						<h1>{thought.name}</h1>
						<section className="flex flex-wrap gap-4 *:rounded-full *:bg-background-dark *:p-4">
							<span>
								Reading time:{' '}
								{readingTime(thought.body, { wordsPerMinute: 100 }).minutes}{' '}
								mins
							</span>
						</section>
						<Image
							src={thought.hero}
							width={1920}
							height={1080}
							alt={thought.name + ' hero image'}
							className="w-full aspect-video"
						/>
						<section className="relative 2xl:flex 2xl:justify-between">
							<section className="max-w-prose">
								<ThoughtBody thought={thought} />
							</section>
							<TableofContents className="not-prose mt-[20rem] sticky top-[50vh] -translate-y-1/2 self-start h-auto" />
						</section>
					</article>

					<BackLink />
				</div>
			</main>
			<Footer />
		</ReactLenis>
	);
}
