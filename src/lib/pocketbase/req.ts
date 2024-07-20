import { redirect } from 'next/navigation';
import { createServerClient } from './config';
import { ClientResponseError } from './types';
import { RecordListOptions } from 'pocketbase';

export async function getThought(slug: string) {
	const client = await createServerClient();

	try {
		const thoughts = await client.collection('thoughts').getList(1, 1, {
			filter: client.filter('slug={:slug}&&published=true', { slug: slug }),
			next: { revalidate: 3600 },
			cache: 'force-cache'
		});

		if (thoughts.items.length == 0) {
			return {
				url: '/thoughts',
				status: 404,
				response: {},
				isAbort: false,
				originalError: null
			} as ClientResponseError;
		}

		const thought = thoughts.items[0];
		thought.markdown = client.files.getUrl(thought, thought.markdown);
		thought.images = thought.images.map((image) =>
			client.files
				.getUrl(thought, image)
				.replace('https://cod3d.pockethost.io', '')
		);

		return thought;
	} catch (error: unknown) {
		return error as ClientResponseError;
	}
}

export async function getThoughts(
	page?: number | undefined,
	perPage?: number | undefined,
	options?: RecordListOptions
) {
	const client = await createServerClient();

	try {
		const posts = await client.collection('thoughts').getList(page, perPage, {
			...options,
			filter: 'published=true',
			next: { revalidate: 3600 },
			cache: 'force-cache'
		});
		return posts.items;
	} catch (error: unknown) {
		return error as ClientResponseError;
	}
}

export async function getProjects(
	page?: number | undefined,
	perPage?: number | undefined
) {
	const client = await createServerClient();

	try {
		const projects = await client
			.collection('projects')
			.getList(page, perPage, {
				filter: 'repo!=null',
				sort: 'status',
				next: { revalidate: 3600 },
				cache: 'force-cache'
			});
		return projects.items;
	} catch (error: unknown) {
		return error as ClientResponseError;
	}
}
