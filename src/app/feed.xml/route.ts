import { getThoughts } from '@pocketbase/req';
import { Thought } from '@pocketbase/types';
import { isError } from '@pocketbase/utils';
import RSS from 'rss';

import { HOST } from '@/lib/constants';

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

	const feedOptions = {
		title: "cod3d's thoughts",
		description: 'A place where I share my struggles',
		site_url: HOST,
		feed_url: `${HOST}/feed.xml`,
		image_url: `${HOST}/img/og/og.webp`,
		pubDate: new Date().toUTCString(),
		copyright: `All rights reserved - ${new Date().getFullYear().toString()}`
	};

	const feed = new RSS(feedOptions);

	thoughts.map((thought) => {
		feed.item({
			title: thought.title,
			description: thought.description,
			url: `${HOST}/thoughts/${thought.slug}`,
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
