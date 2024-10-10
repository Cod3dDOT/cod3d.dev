import '@/app/styles/blog.css';

import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { TechArticle, WithContext } from 'schema-dts';

import { Footer } from '@/components/footer';
import BackIcon from '@/components/icons/back';
import { ThoughtHeader } from '@/components/pages/thoughts/thought/header';
import { ThoughtMarkdown } from '@/components/pages/thoughts/thought/markdown';
import { ReactLenis } from '@/lib/lenis';
import { getThought, getThoughts } from '@/lib/pocketbase/req';
import { Thought } from '@/lib/pocketbase/types';
import { isError } from '@/lib/pocketbase/utils';

// export const experimental_ppr = true;
export const revalidate = 3600;

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
		title: thought.title,
		description: thought.description,
		alternates: {
			canonical: 'https://cod3d.dev/thoughts/' + thought.slug
		},
		openGraph: {
			type: 'website',
			url: 'https://cod3d.dev/thoughts/' + thought.slug,
			title: thought.title,
			description: thought.description
		},
		twitter: {
			card: 'summary_large_image',
			title: thought.title,
			description: thought.description,
			creator: '@cod3ddot'
		}
	};
}

const BackLink: React.FC = () => {
	return (
		<Link
			hrefLang="en"
			href="/thoughts"
			className="print:hidden inline-flex items-center space-x-2 hover:underline animate-in slide-in-from-top-1 px-10 duration-1000"
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
	const markdownResponse = await fetch(thought.markdown);

	if (!markdownResponse.ok || isError(markdownResponse)) {
		return notFound();
	}

	const markdown = await markdownResponse.text();

	const jsonLd: WithContext<TechArticle> = {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		url: 'https://cod3d.dev/thoughts/' + thought.slug,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': 'https://cod3d.dev/thoughts/' + thought.slug
		},
		headline: thought.title,
		image: thought.markdown_images[0] || 'https://cod3d.dev/favicon.png',
		author: {
			'@type': 'Person',
			name: 'cod3d',
			url: 'https://github.com/cod3ddot'
		},
		datePublished: thought.created,
		dateModified: thought.updated
	};

	return (
		<ReactLenis root>
			<main
				className={
					'bg-background md:px-10 xl:flex sm:pt-24 py-8 print:pt-8 font-sans'
				}
			>
				<div className="block mx-auto md:container z-10">
					<BackLink />
					<article
						className={clsx(
							'prose lg:prose-xl prose-neutral prose-amber max-w-none dark:prose-invert',
							'prose-headings:font-light md:prose-headings:w-4/5',
							'hover:prose-a:text-blue-500 prose-a:transition-colors',
							'prose-code:before:content-none prose-code:after:content-none',
							'prose-code:bg-background-dark prose-code:p-2 prose-code:rounded-md prose-code:border prose-code:border-neutral-700',
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

						<ThoughtMarkdown
							title={thought.title}
							description={thought.description}
							hero={thought.hero}
							images={thought.markdown_images}
							markdown={markdown}
						/>
					</article>

					<BackLink />
				</div>
			</main>
			<Footer />
		</ReactLenis>
	);
}
