import Link from 'next/link';

import { ThoughtMarkdown } from '@/components/pages/thoughts/thought/markdown';
import { getThought, getThoughts } from '@/lib/pocketbase/req';
import { ReactLenis } from '@/lib/lenis';
import { Footer } from '@/components/footer';
import clsx from 'clsx';
import BackIcon from '@/components/icons/back';

import readingTime from '@/lib/readingTime';
import { dateToString } from '@/lib/utils/date';
import { isError } from '@/lib/pocketbase/utils';
import { Thought } from '@/lib/pocketbase/types';
import { notFound } from 'next/navigation';
import { TechArticle, WithContext } from 'schema-dts';

import '@/app/styles/blog.css';
import { ThoughtHeader } from '@/components/pages/thoughts/thought/header';

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
		title: thought.og_title,
		description: thought.og_description,
		alternates: {
			canonical: 'https://cod3d.dev/thoughts' + thought.slug
		},
		openGraph: {
			type: 'website',
			url: 'https://cod3d.dev/thoughts' + thought.slug,
			title: thought.og_title,
			description: thought.og_description,
			siteName: "cod3d's den"
		},
		twitter: {
			card: 'summary_large_image',
			title: thought.og_title,
			description: thought.og_description,
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
			className="inline-flex items-center space-x-2 hover:underline opacity-0 animate-blog-in"
		>
			<BackIcon className="h-full aspect-square" />
			<span>All thoughts</span>
		</Link>
	);
};

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
	const markdown = await (await fetch(thought.markdown)).text();

	const jsonLd: WithContext<TechArticle> = {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		url: 'https://cod3d.dev/thoughts/' + thought.slug,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': 'https://cod3d.dev/thoughts/' + thought.slug
		},
		headline: thought.og_title,
		image: thought.og_description,
		author: {
			'@type': 'Person',
			name: 'cod3d',
			url: 'https://github.com/cod3ddot'
		},
		datePublished: dateToString(new Date(thought.created)),
		dateModified: dateToString(new Date(thought.updated))
	};

	return (
		<ReactLenis root className="h-screen overflow-y-auto">
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
							'prose-headings:font-light md:prose-headings:w-4/5',
							'prose-h1:animate-blog-in prose-h1:delay-500 prose-h1:opacity-0',
							'hover:prose-a:text-blue-500 prose-a:transition-colors',
							'pb-8'
						)}
					>
						<script
							type="application/ld+json"
							dangerouslySetInnerHTML={{
								__html: JSON.stringify(jsonLd)
							}}
						/>

						<ThoughtHeader thought={thought} markdown={markdown} />

						<ThoughtMarkdown images={thought.images} markdown={markdown} />
					</article>

					<BackLink />
				</div>
			</main>
			<Footer />
		</ReactLenis>
	);
}
