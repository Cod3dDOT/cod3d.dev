import { createServerClient } from "@pocketbase/config";
import { getThought, getThoughts } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import ReactLenis from "lenis/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BreadcrumbList, TechArticle, WithContext } from "schema-dts";

import { Footer } from "@/components/footer";
import readingTime from "@/lib/markdown/readingTime";
import { minutesToDuration } from "@/lib/utils/date";
import { ThoughtHeader } from "./(components)/header";
import { MarkdownWrapper } from "./(components)/markdown/wrapper";

export const revalidate = 86400; // revalidate every day
export const dynamicParams = true; // if path that hasn't been generated, server-render on-demand

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = (await params).slug;
	const client = createServerClient();
	const thoughtResponse = await getThought(client, slug);

	const domain = process.env.SITE_URL;
	const thoughtUrl = `${domain}/thoughts/${slug}`;

	if (isError(thoughtResponse)) {
		return {
			title: "cod3d's thoughts",
			description: "cod3d's thoughts",
			openGraph: {
				type: "website",
				url: thoughtUrl,
				title: "cod3d's thoughts",
				description:
					"There has been an error retrieving the thought. Try to visit the website and reload the page.",
				siteName: process.env.SITE_NAME
			}
		};
	}

	const thought = thoughtResponse as Thought;

	return {
		title: thought.title,
		description: thought.description,
		alternates: {
			canonical: thoughtUrl,
			types: {
				"application/rss": `${domain}/feed.xml`
			}
		},
		keywords: thought.tags,
		robots: {
			index: true,
			follow: true,
			noarchive: true,
			nosnippet: false,
			noimageindex: false,
			"max-image-preview": "large"
		},
		openGraph: {
			locale: "en_US",
			type: "article",
			url: thoughtUrl,
			title: thought.title,
			description: thought.description,
			publishedTime: thought.created.toISOString(),
			authors: ["cod3d"]
		},
		twitter: {
			card: "summary_large_image",
			title: thought.title,
			description: thought.description,
			creator: "@cod3ddot",
			site: process.env.SITE_URL
		}
	};
}

export async function generateStaticParams() {
	const thoughtsResponse = await getThoughts(1, 20, { sort: "created" });

	if (isError(thoughtsResponse)) {
		console.error("Could not get thoughts");
		return [];
	}

	const thoughts = thoughtsResponse as Thought[];

	return thoughts.map((thought) => ({
		slug: thought.slug
	}));
}

export default async function Page({ params }: Props) {
	const slug = (await params).slug;

	const client = createServerClient();
	const thoughtResponse = await getThought(client, slug);

	if (isError(thoughtResponse)) {
		return notFound();
	}

	const thought = thoughtResponse as Thought;

	const markdownResponse = await fetch(thought.markdown);

	if (!markdownResponse.ok || isError(markdownResponse)) {
		return notFound();
	}

	const markdown = await markdownResponse.text();
	const time = readingTime(markdown);

	const domain = process.env.SITE_URL;
	const thoughtUrl = `${domain}/thoughts/${slug}`;

	const jsonLd: WithContext<TechArticle> = {
		"@context": "https://schema.org",
		"@type": "TechArticle",
		url: thoughtUrl,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": thoughtUrl
		},
		headline: thought.title,
		image: `${domain}/${thought.hero.light}`,
		author: {
			"@type": "Person",
			name: "cod3d",
			url: "https://github.com/cod3ddot"
		},
		datePublished: thought.created.toISOString(),
		dateModified: thought.updated.toISOString(),
		wordCount: time.words.total,
		timeRequired: minutesToDuration(time.minutes),
		inLanguage: "English",
		keywords: thought.tags
	};

	const jsonLdBreadcrumbList: WithContext<BreadcrumbList> = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		name: `Breadcrumb for ${thought.title}`,
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Home page",
				item: domain
			},
			{
				"@type": "ListItem",
				position: 3,
				name: thought.title,
				item: thoughtUrl
			}
		]
	};

	return (
		<ReactLenis root>
			<main className="relative bg-background font-sans transition-[background-color]">
				<article>
					<script
						type="application/ld+json"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(jsonLd)
						}}
					/>

					<script
						type="application/ld+json"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(jsonLdBreadcrumbList)
						}}
					/>

					<ThoughtHeader
						slug={thought.slug}
						thought={thought}
						markdown={markdown}
					/>

					<MarkdownWrapper
						images={thought.markdown_images}
						markdown={markdown}
					/>
				</article>
			</main>
			<Footer />
		</ReactLenis>
	);
}
