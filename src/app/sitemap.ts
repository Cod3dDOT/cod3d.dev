import { getThoughts } from '@pocketbase/req';
import { Thought } from '@pocketbase/types';
import { isError } from '@pocketbase/utils';
import { MetadataRoute } from 'next';

import { HOST } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticSitemap: MetadataRoute.Sitemap = [
		{
			url: HOST,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1
		},
		{
			url: HOST + '/thoughts',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7
		},
		{
			url: HOST + '/projects',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5
		}
	];

	const thoughtsResponse = await getThoughts();

	if (isError(thoughtsResponse)) {
		console.error('Could not get thoughts while compiling sitemap.xml');
		return staticSitemap;
	}

	const thoughts = thoughtsResponse as Thought[];

	const withThoughts: MetadataRoute.Sitemap = thoughts.map((thought) => ({
		url: `${HOST}/thoughts/${thought.slug}`,
		lastModified: thought.updated
	}));

	return staticSitemap.concat(withThoughts);
}
