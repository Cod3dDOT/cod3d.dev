import { RecordListOptions } from 'pocketbase';

import { createServerClient } from './config';
import {
	ClientResponseError,
	PBProject,
	PBThought,
	Project,
	Thought,
	TypedPocketBase
} from './types';
import { getUrl } from './utils';

function processThoughts(
	client: TypedPocketBase,
	thoughts: PBThought[]
): Thought[] {
	return thoughts.map((thought) => {
		const dark = thought.hero.find((hero) => hero.includes('dark'));
		const light = thought.hero.find((hero) => hero != dark)!;
		return {
			...thought,
			created: new Date(thought.created),
			updated: new Date(thought.updated),
			hero: {
				light: getUrl(client, thought, light).pathname,
				dark: dark ? getUrl(client, thought, dark).pathname : undefined
			},
			markdown: getUrl(client, thought, thought.markdown).pathname,
			markdown_images: thought.markdown_images.map(
				(image) => getUrl(client, thought, image).pathname
			),
			tags: thought.expand?.tags.map((tag) => tag.tag) || []
		};
	});
}

function processProjects(
	client: TypedPocketBase,
	projects: PBProject[]
): Project[] {
	return projects.map((project) => {
		return {
			...project,
			created: new Date(project.created),
			updated: new Date(project.updated),
			tags: project.expand?.tags.map((tag) => tag.tag) || []
		};
	});
}

export async function getThought(
	client: TypedPocketBase,
	slug: string
): Promise<Thought | ClientResponseError> {
	try {
		const thoughts = await client.collection('thoughts').getList(1, 1, {
			filter: client.filter('slug={:slug}&&published=true', {
				slug: slug,
				expand: 'tags'
			})
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

		const thought = processThoughts(client, thoughts.items)[0];

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
		const thoughts = await client
			.collection('thoughts')
			.getList(page, perPage, {
				...options,
				filter: 'published=true',
				expand: 'tags'
			});
		const thoughtsList = processThoughts(client, thoughts.items);

		return thoughtsList;
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
				expand: 'tags'
			});

		return processProjects(client, projects.items);
	} catch (error: unknown) {
		return error as ClientResponseError;
	}
}

export async function authenticate(client: TypedPocketBase) {
	if (!process.env.POCKETBASE_USER || !process.env.POCKETBASE_PASS) {
		throw new Error('Invalid .env auth config');
	}

	if (client.authStore.isValid) {
		return;
	}

	try {
		const authStore = await client
			.collection('users')
			.authWithPassword(
				process.env.POCKETBASE_USER,
				process.env.POCKETBASE_PASS
			);

		return authStore;
	} catch (error: unknown) {
		return error as ClientResponseError;
	}
}
