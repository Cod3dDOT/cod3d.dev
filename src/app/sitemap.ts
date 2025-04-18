import { getThoughts } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import type { MetadataRoute } from "next";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticSitemap: MetadataRoute.Sitemap = [
		{
			url: "https://cod3d.dev",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1
		},
		{
			url: "https://cod3d.dev/thoughts",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7
		},
		{
			url: "https://cod3d.dev/projects",
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.5
		}
	];

	const thoughtsResponse = await getThoughts();

	if (isError(thoughtsResponse)) {
		console.error("Could not get thoughts while compiling sitemap.xml");
		return staticSitemap;
	}

	const thoughts = thoughtsResponse as Thought[];

	const withThoughts: MetadataRoute.Sitemap = thoughts.map((thought) => ({
		url: `https://cod3d.dev/thoughts/${thought.slug}`,
		lastModified: thought.updated
	}));

	return staticSitemap.concat(withThoughts);
}
