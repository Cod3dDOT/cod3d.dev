import { MetadataRoute } from 'next';

import { getThoughts } from '@/lib/pocketbase/req';
import { Thought } from '@/lib/pocketbase/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticSitemap: MetadataRoute.Sitemap = [
		{
			url: 'https://cod3d.dev',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: 'https://cod3d.dev/thoughts',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7
		},
		{
			url: 'https://cod3d.dev/projects',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5
		}
	];

	const thoughtsResponse = await getThoughts(1, 20);
	const thoughts = thoughtsResponse as Thought[];

	const withThoughts = thoughts.map((thought) => ({
		url: `https://cod3d.dev/thoughts/${thought.slug}`,
		lastModified: new Date(thought.updated)
	}));

	return staticSitemap.concat(withThoughts);
}
