import PocketBase from 'pocketbase';

import { TypedPocketBase } from './types';

const pbUrl = process.env.PB_URL;
const pbUser = process.env.PB_USER;
const pbPass = process.env.PB_PASS;

if (!pbUrl || !pbUser || !pbPass)
	throw new Error('Invalid .env database config');

export let pb: TypedPocketBase;

export const getPB = async () => {
	if (pb && pb.authStore.isValid) return pb;

	pb = new PocketBase(pbUrl) as TypedPocketBase;
	pb.autoCancellation(false); // if (process.env.NODE_ENV === 'development')

	const authData = await pb
		.collection('users')
		.authWithPassword(pbUser, pbPass, { requestKey: null });

	pb.authStore.save(authData.token);

	return pb;
};
