import { redirect } from 'next/navigation';
import { createServerClient } from './config';
import { ClientResponseError } from './types';

export async function getThought(slug: string) {
	const client = await createServerClient();

	try {
		const thoughts = await client
			.collection('thoughts')
			.getList(1, 1, { filter: `slug='${slug}'` });

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
		thought.hero = client.files.getUrl(thought, thought.hero, {
			thumb: '100x100'
		});

		return thought;
	} catch (error: unknown) {
		return error as ClientResponseError;
	}
}

export async function getThoughts(
	page?: number | undefined,
	perPage?: number | undefined
) {
	const client = await createServerClient();

	try {
		const posts = await client.collection('thoughts').getList(page, perPage, {
			sort: 'created'
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
				filter: 'repo != null',
				sort: 'status'
			});
		return projects.items;
	} catch (error: unknown) {
		return error as ClientResponseError;
	}
}
