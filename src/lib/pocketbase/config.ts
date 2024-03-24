import PocketBase, { FileOptions } from 'pocketbase';

import { pb_url } from './consts';
import { Project, Thought, TypedPocketBase } from './types';

const pb = new PocketBase(pb_url) as TypedPocketBase;
pb.autoCancellation(false);

const authenticate = async () => {
	const authData = await pb
		.collection('users')
		.authWithPassword('cod3d.dev', 'Vqh66Zyp5rR2zT1', { requestKey: null });

	pb.authStore.save(authData.token);
};

export const getPb = async () => {
	if (!pb.authStore.isValid) {
		await authenticate();
	}
	return pb;
};

export function getFileUrl(
	record:
		| {
				[key: string]: string;
		  }
		| Project
		| Thought,
	filename: string,
	queryParams?: FileOptions | undefined
) {
	return pb.files.getUrl(record, filename, queryParams);
}
