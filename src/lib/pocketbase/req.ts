import { createServerClient } from './config';
import { ClientResponseError } from './types';
import { RecordListOptions } from 'pocketbase';

export async function getThought(slug: string) {
	const client = await createServerClient();

	try {
		const thoughts = await client.collection('thoughts').getList(1, 1, {
			filter: client.filter('slug={:slug}&&published=true', { slug: slug })
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
		thought.hero = new URL(client.files.getUrl(thought, thought.hero)).pathname;
		thought.markdown = client.files.getUrl(thought, thought.markdown);
		thought.markdown_images = thought.markdown_images.map(
			(image) => new URL(client.files.getUrl(thought, image)).pathname
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
			filter: 'published=true'
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
				sort: 'status'
			});
		return projects.items;
	} catch (error: unknown) {
		return error as ClientResponseError;
	}
}
