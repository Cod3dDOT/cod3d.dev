import RSS, { type FeedOptions } from "rss";

import { markdownToHtml } from "@/lib/markdown";
import { getThoughts } from "@/pocketbase/req";
import type { Thought } from "@/pocketbase/types";
import { isError } from "@/pocketbase/utils";

export const revalidate = 86400;
export const runtime = "nodejs";

export async function GET() {
	const thoughtsResponse = await getThoughts();

	if (isError(thoughtsResponse)) {
		console.error("Could not get thoughts while compiling feed.xml");
		return new Response(null, { status: 500 });
	}

	const thoughts = thoughtsResponse as Thought[];
	const siteUrl = process.env.NEXT_PUBLIC_URL;

	const feedOptions: FeedOptions = {
		title: "cod3d's thoughts",
		description: "A place where I share my struggles",
		site_url: siteUrl,
		feed_url: `${siteUrl}/feed.xml`,
		image_url: `${siteUrl}/img/og/og.webp`,
		pubDate: new Date().toUTCString(),
		copyright: `Copyright - ${new Date().getFullYear()}, cod3d`,
		language: "en-US",
		custom_namespaces: {
			content: "http://purl.org/rss/1.0/modules/content/"
		}
	};

	const feed = new RSS(feedOptions);

	// Fetch all content in parallel
	const contentResults = await Promise.all(
		thoughts.map(async (thought) => {
			const content = await (await fetch(thought.markdown)).text();
			const parsed = await markdownToHtml(content, thought.markdown_images);
			return { thought, content: parsed };
		})
	);

	// Add items to feed
	for (const { thought, content } of contentResults) {
		feed.item({
			title: thought.title,
			description: thought.description,
			url: `${siteUrl}/thoughts/${thought.slug}`,
			guid: thought.id,
			date: thought.created,
			categories: thought.tags,
			custom_elements: [
				{
					"content:encoded": {
						_cdata: content
					}
				}
			]
		});
	}

	const response = feed
		.xml({ indent: true })
		.replace(
			`<?xml version="1.0" encoding="UTF-8"?>`,
			`<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="/xsl/rss.xsl" type="text/xsl"?>`
		);

	return new Response(response, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8"
		}
	});
}
