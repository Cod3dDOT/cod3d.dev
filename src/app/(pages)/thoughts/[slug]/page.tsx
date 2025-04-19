import { createServerClient } from "@pocketbase/config";
import { getThought, getThoughts } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import ReactLenis from "lenis/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BreadcrumbList, TechArticle, WithContext } from "schema-dts";

import { Footer } from "@/components/footer";
import readingTime from "@/lib/readingTime";
import { minutesToDuration } from "@/lib/utils/date";
import { ThoughtHeader } from "./(components)/header";
import { MarkdownWrapper } from "./(components)/markdown/wrapper";

// export const experimental_ppr = true;
export const revalidate = 86400;

type Props = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = (await params).slug;
	const client = createServerClient();
	const thoughtResponse = await getThought(client, slug);

	const domain = process.env.NEXT_PUBLIC_URL;
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
				siteName: "cod3d's den"
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
				"application/rss+xml": `${domain}/feed.xml`
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
			site: "cod3d's den"
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

	const domain = process.env.NEXT_PUBLIC_URL;
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
				name: "cod3d.dev",
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
			<main className="relative bg-background font-sans">
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

					<div className="bg-gradient-to-b from-transparent via-transparent to-background md:px-10">
						<ThoughtHeader
							slug={thought.slug}
							thought={thought}
							markdown={markdown}
						/>
					</div>

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
