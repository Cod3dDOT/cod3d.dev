import { redirect } from 'next/navigation';

import { pb } from './config';

export async function getThought(slug: string) {
	const items = (
		await pb.collection('thoughts').getList(1, 1, { filter: `slug='${slug}'` })
	).items;

	if (items.length == 0) {
		redirect(`/404`);
	}
	return items[0];
}
