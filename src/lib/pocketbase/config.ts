import PocketBase, { FileOptions } from 'pocketbase';

import { pb_url } from './consts';
import { Project, Thought, TypedPocketBase } from './types';

export const pb = new PocketBase(pb_url) as TypedPocketBase;

const authData = await pb
	.collection('users')
	.authWithPassword('cod3d.dev', 'Vqh66Zyp5rR2zT1');

pb.authStore.save(authData.token);
pb.autoCancellation(false);

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
