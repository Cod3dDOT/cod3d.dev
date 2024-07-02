import Link from 'next/link';

import { ThoughtBody } from '@/components/pages/thoughts/thought/body';
import { getThought, getThoughts } from '@/lib/pocketbase/req';
import { ReactLenis } from '@/lib/lenis';
import { Footer } from '@/components/footer';
import clsx from 'clsx';
import BackIcon from '@/components/icons/back';

import Image from 'next/image';
import readingTime from '@/lib/readingTime';
import { dateToString } from '@/lib/utils/date';
import { isError } from '@/lib/pocketbase/utils';
import { Thought } from '@/lib/pocketbase/types';
import { notFound } from 'next/navigation';
import { TableOfContents } from '@/components/pages/thoughts/thought/tableOfContents';
import { TechArticle, WithContext } from 'schema-dts';

export async function generateMetadata({
	params
}: {
	params: { slug: string };
}) {
	const thoughtResponse = await getThought(params.slug);

	if (isError(thoughtResponse)) {
		return {
			title: "cod3d's thoughts",
			description: "cod3d's thoughts",
			openGraph: {
				type: 'website',
				url: 'https://cod3d.dev',
				title: "cod3d's thoughts",
				description:
					'There has been an error retrieving the thought. Try to visit the website and reload the page.',
				siteName: "cod3d's den"
			}
		};
	}

	const thought = thoughtResponse as Thought;

	return {
		title: thought.name,
		description: thought.description,
		openGraph: {
			type: 'website',
			url: 'https://cod3d.dev',
			title: thought.name,
			description: thought.description,
			siteName: "cod3d's den"
		},
		twitter: {
			card: 'summary_large_image',
			title: thought.name,
			description: thought.description,
			creator: '@cod3ddot',
			site: "cod3d's den"
		}
	};
}

const BackLink: React.FC = () => {
	return (
		<Link
			hrefLang="en"
			href="/thoughts"
			className="inline-flex items-center space-x-2 hover:underline"
		>
			<BackIcon className="h-full aspect-square" />
			<span>All thoughts</span>
		</Link>
	);
};

// revalidate at most every day, in seconds
export const revalidate = 5;
export const dynamicParams = false;

export async function generateStaticParams() {
	const thoughtsResponse = await getThoughts(1, 20, { sort: 'created' });

	if (isError(thoughtsResponse)) {
		return [];
	}

	const thoughts = thoughtsResponse as Thought[];

	return thoughts.map((thought) => ({
		slug: thought.slug
	}));
}

export default async function Page({ params }: { params: { slug: string } }) {
	const thoughtResponse = await getThought(params.slug);

	if (isError(thoughtResponse)) {
		return notFound();
	}

	const thought = thoughtResponse as Thought;

	const jsonLd: WithContext<TechArticle> = {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		url: 'https://cod3d.dev/thoughts/' + thought.slug,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': 'https://cod3d.dev/thoughts/' + thought.slug
		},
		headline: thought.name,
		image: thought.hero,
		author: {
			'@type': 'Person',
			name: 'cod3d',
			url: 'https://github.com/cod3ddot'
		},
		datePublished: dateToString(thought.created),
		dateModified: dateToString(thought.updated)
	};

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
						<script
							type="application/ld+json"
							dangerouslySetInnerHTML={{
								__html: JSON.stringify(jsonLd)
							}}
						/>

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
							priority
							src={thought.hero}
							width={1920}
							height={1080}
							sizes="90vw"
							alt={thought.name + ' hero image'}
							className="w-full aspect-video"
						/>
						<section className="relative 2xl:flex 2xl:justify-between">
							<section className="max-w-prose">
								<ThoughtBody thought={thought} />
							</section>
							<TableOfContents className="not-prose mt-[20rem] sticky top-[50vh] -translate-y-1/2 self-start h-auto" />
						</section>
					</article>

					<BackLink />
				</div>
			</main>
			<Footer />
		</ReactLenis>
	);
}
