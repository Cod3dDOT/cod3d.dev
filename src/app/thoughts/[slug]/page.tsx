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
import { dateToString } from '@/lib/utils/date';

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
			className="flex w-fit items-center space-x-2 group hover:underline"
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
							'prose lg:prose-xl prose-neutral prose-amber max-w-none dark:prose-invert',
							'prose-headings:font-light prose-headings:w-4/5 prose-h1:text-[5vw]',
							'prose-img:w-full prose-img:rounded-xl',
							'hover:prose-a:text-blue-500 prose-a:transition-colors',
							'prose-pre:bg-background-dark prose-pre:text-current',
							'pb-8'
						)}
					>
						<section className="uppercase flex flex-col sm:flex-row py-20 text-base sm:gap-72 gap-12">
							<div>
								<span className="font-extralight">Reading time</span>
								<br />
								{readingTime(thought.body, { wordsPerMinute: 100 }).minutes}
								<span> minutes</span>
							</div>
							<div>
								<span className="font-extralight">Published</span>
								<br />
								<time dateTime={thought.created}>
									{dateToString(thought.created)}
								</time>
							</div>
						</section>
						<h1>{thought.name}</h1>

						<Image
							src={thought.hero}
							width={1920}
							height={1080}
							sizes="(max-width: 768px) 100vw, 90vw"
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
