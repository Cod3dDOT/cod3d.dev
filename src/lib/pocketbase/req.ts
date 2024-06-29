import { redirect } from 'next/navigation';
import { getPB } from './config';

export async function getThought(slug: string) {
	const pb = await getPB();

	const items = (
		await pb.collection('thoughts').getList(1, 1, { filter: `slug='${slug}'` })
	).items;

	if (items.length == 0) {
		redirect(`/404`);
	}

	const thought = items[0];
	thought.hero = pb.files.getUrl(thought, thought.hero, {
		thumb: '100x100'
	});

	return thought;
}

export async function getThoughts(
	page?: number | undefined,
	perPage?: number | undefined
) {
	const pb = await getPB();

	return (
		await pb.collection('thoughts').getList(page, perPage, {
			sort: 'created'
		})
	).items;
}

export async function getProjects(
	page?: number | undefined,
	perPage?: number | undefined
) {
	const pb = await getPB();
	return (
		await pb.collection('projects').getList(page, perPage, {
			filter: 'repo != null',
			sort: 'status'
		})
	).items;
}
