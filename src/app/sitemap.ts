import { MetadataRoute } from 'next';

import { getThoughts } from '@/lib/pocketbase/req';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const thoughts = await getThoughts(1, 20);

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
			priority: 0.8
		}
	];

	const withThoughts = thoughts.map((thought) => ({
		url: `https://cod3d.dev/thought/${thought.slug}`,
		lastModified: new Date(thought.updated)
	}));

	return staticSitemap.concat(withThoughts);
}
