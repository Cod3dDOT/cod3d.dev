import RSS from 'rss';

import { getThoughts } from '@/lib/pocketbase/req';
import { Thought } from '@/lib/pocketbase/types';
import { isError } from '@/lib/pocketbase/utils';

export const revalidate = 86400;

export async function GET() {
	const thoughtsResponse = await getThoughts();

	if (isError(thoughtsResponse)) {
		console.error('Could not get thoughts while compiling feed.xml');
		return new Response(null, {
			status: 500
		});
	}

	const thoughts = thoughtsResponse as Thought[];

	const siteUrl =
		process.env.NODE_ENV === 'production'
			? 'https://cod3d.dev'
			: 'http://localhost:3000';

	const feedOptions = {
		title: "cod3d's thoughts",
		description: 'A place where I share my struggles',
		site_url: siteUrl,
		feed_url: `${siteUrl}/feed.xml`,
		image_url: `${siteUrl}/img/og/og.webp`,
		pubDate: new Date().toUTCString(),
		copyright: `All rights reserved - ${new Date().getFullYear()}`
	};

	const feed = new RSS(feedOptions);

	thoughts.map((thought) => {
		feed.item({
			title: thought.title,
			description: thought.description,
			url: `${siteUrl}/thoughts/${thought.slug}`,
			guid: thought.id,
			date: thought.created
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	});
}
