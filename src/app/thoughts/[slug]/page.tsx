import '@/app/styles/blog.css';

import clsx from 'clsx';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BreadcrumbList, TechArticle, WithContext } from 'schema-dts';

import { Footer } from '@/components/footer';
import { BackLink } from '@/components/pages/thoughts/thought/backLink';
import { ThoughtHeader } from '@/components/pages/thoughts/thought/header';
import { ThoughtMarkdown } from '@/components/pages/thoughts/thought/markdown';
import { ReactLenis } from '@/lib/lenis';
import { createServerClient } from '@/lib/pocketbase/config';
import { getThought, getThoughts } from '@/lib/pocketbase/req';
import { Thought } from '@/lib/pocketbase/types';
import { isError } from '@/lib/pocketbase/utils';
import readingTime from '@/lib/readingTime';
import { minutesToDuration } from '@/lib/utils/date';

// export const experimental_ppr = true;
export const revalidate = 86400;

export async function generateMetadata({
	params
}: ThoughtPageProps): Promise<Metadata> {
	const slug = (await params).slug;
	const client = await createServerClient();
	const thoughtResponse = await getThought(client, slug);

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
			canonical: 'https://cod3d.dev/thoughts/' + thought.slug,
			types: {
				'application/rss+xml': 'https://cod3d.dev/feed.xml'
			}
		},
		keywords: thought.tags,
		robots: {
			index: true,
			follow: true,
			noarchive: true,
			nosnippet: false,
			noimageindex: false,
			'max-image-preview': 'large'
		},
		openGraph: {
			locale: 'en_US',
			type: 'article',
			url: 'https://cod3d.dev/thoughts/' + thought.slug,
			title: thought.title,
			description: thought.description,
			publishedTime: thought.created.toISOString(),
			authors: ['cod3d']
		},
		twitter: {
			card: 'summary_large_image',
			title: thought.title,
			description: thought.description,
			creator: '@cod3ddot',
			site: "cod3d's den"
		}
	};
}

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

interface ThoughtPageProps {
	params: Promise<{ slug: string }>;
}

const Page: React.FC<ThoughtPageProps> = async ({ params }) => {
	const slug = (await params).slug;

	const client = await createServerClient();
	const thoughtResponse = await getThought(client, slug);

	if (isError(thoughtResponse)) {
		return notFound();
	}

	const thought = thoughtResponse as Thought;
	//FIXME: remove hardcoded url
	const markdownResponse = await fetch('https://cod3d.dev' + thought.markdown);

	if (!markdownResponse.ok || isError(markdownResponse)) {
		return notFound();
	}

	const markdown = await markdownResponse.text();
	const time = readingTime(markdown);

	const jsonLd: WithContext<TechArticle> = {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		url: 'https://cod3d.dev/thoughts/' + thought.slug,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': 'https://cod3d.dev/thoughts/' + thought.slug
		},
		headline: thought.title,
		image: thought.markdown_images,
		author: {
			'@type': 'Person',
			name: 'cod3d',
			url: 'https://github.com/cod3ddot'
		},
		datePublished: thought.created.toISOString(),
		dateModified: thought.updated.toISOString(),
		wordCount: time.words.total,
		timeRequired: minutesToDuration(time.minutes),
		inLanguage: 'English',
		keywords: thought.tags
	};

	const jsonLdBreadcrumbList: WithContext<BreadcrumbList> = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		name: 'Breadcrumb for ' + thought.title,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'cod3d.dev',
				item: 'https://cod3d.dev'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'thoughts',
				item: 'https://cod3d.dev/thoughts'
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: thought.title,
				item: 'https://cod3d.dev/thoughts/' + thought.slug
			}
		]
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
							'prose-h4:text-[larger]',
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

						<script
							type="application/ld+json"
							dangerouslySetInnerHTML={{
								__html: JSON.stringify(jsonLdBreadcrumbList)
							}}
						/>

						<ThoughtHeader
							slug={thought.slug}
							thought={thought}
							markdown={markdown}
						/>

						<ThoughtMarkdown
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
};

export default Page;
