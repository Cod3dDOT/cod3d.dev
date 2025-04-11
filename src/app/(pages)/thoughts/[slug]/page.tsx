import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerClient } from "@pocketbase/config";
import { getThought, getThoughts } from "@pocketbase/req";
import { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import ReactLenis from "lenis/react";
import { BreadcrumbList, TechArticle, WithContext } from "schema-dts";

import { Footer } from "@/components/footer";
import { AuroraBackground } from "@/components/pages/thoughts/aurora";
import { ThoughtHeader } from "@/components/pages/thoughts/thought/header";
import { MarkdownWrapper } from "@/components/pages/thoughts/thought/markdown/wrapper";
import readingTime from "@/lib/readingTime";
import { minutesToDuration } from "@/lib/utils/date";

// export const experimental_ppr = true;
export const revalidate = 86400;

interface ThoughtPageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({
	params,
}: ThoughtPageProps): Promise<Metadata> {
	const slug = (await params).slug;
	const client = createServerClient();
	const thoughtResponse = await getThought(client, slug);

	if (isError(thoughtResponse)) {
		return {
			title: "cod3d's thoughts",
			description: "cod3d's thoughts",
			openGraph: {
				type: "website",
				url: "https://cod3d.dev",
				title: "cod3d's thoughts",
				description:
					"There has been an error retrieving the thought. Try to visit the website and reload the page.",
				siteName: "cod3d's den",
			},
		};
	}

	const thought = thoughtResponse as Thought;

	return {
		title: thought.title,
		description: thought.description,
		alternates: {
			canonical: "https://cod3d.dev/thoughts/" + thought.slug,
			types: {
				"application/rss+xml": "https://cod3d.dev/feed.xml",
			},
		},
		keywords: thought.tags,
		robots: {
			index: true,
			follow: true,
			noarchive: true,
			nosnippet: false,
			noimageindex: false,
			"max-image-preview": "large",
		},
		openGraph: {
			locale: "en_US",
			type: "article",
			url: "https://cod3d.dev/thoughts/" + thought.slug,
			title: thought.title,
			description: thought.description,
			publishedTime: thought.created.toISOString(),
			authors: ["cod3d"],
		},
		twitter: {
			card: "summary_large_image",
			title: thought.title,
			description: thought.description,
			creator: "@cod3ddot",
			site: "cod3d's den",
		},
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
		slug: thought.slug,
	}));
}

const Page: React.FC<ThoughtPageProps> = async ({ params }) => {
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

	const jsonLd: WithContext<TechArticle> = {
		"@context": "https://schema.org",
		"@type": "TechArticle",
		url: "https://cod3d.dev/thoughts/" + thought.slug,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": "https://cod3d.dev/thoughts/" + thought.slug,
		},
		headline: thought.title,
		image: "https://cod3d.dev/" + thought.hero.light,
		author: {
			"@type": "Person",
			name: "cod3d",
			url: "https://github.com/cod3ddot",
		},
		datePublished: thought.created.toISOString(),
		dateModified: thought.updated.toISOString(),
		wordCount: time.words.total,
		timeRequired: minutesToDuration(time.minutes),
		inLanguage: "English",
		keywords: thought.tags,
	};

	const jsonLdBreadcrumbList: WithContext<BreadcrumbList> = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		name: "Breadcrumb for " + thought.title,
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "cod3d.dev",
				item: "https://cod3d.dev",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "thoughts",
				item: "https://cod3d.dev/thoughts",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: thought.title,
				item: "https://cod3d.dev/thoughts/" + thought.slug,
			},
		],
	};

	return (
		<ReactLenis root>
			<main className="bg-background relative font-sans">
				<article>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(jsonLd),
						}}
					/>

					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(jsonLdBreadcrumbList),
						}}
					/>

					<AuroraBackground slug={thought.slug} color={thought.color}>
						<div className="to-background bg-gradient-to-b from-transparent via-transparent md:px-10">
							<ThoughtHeader
								slug={thought.slug}
								thought={thought}
								markdown={markdown}
							/>
						</div>
					</AuroraBackground>

					<MarkdownWrapper
						images={thought.markdown_images}
						markdown={markdown}
					/>
				</article>
			</main>
			<Footer />
		</ReactLenis>
	);
};

export default Page;
