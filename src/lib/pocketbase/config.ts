import PocketBase from 'pocketbase';

import { TypedPocketBase } from './types';

export async function createServerClient() {
	const pbUrl = 'https://' + process.env.POCKETBASE_HOST;

	if (!pbUrl) throw new Error('Invalid .env database config');

	if (typeof window !== 'undefined') {
		throw new Error(
			'This method is only supposed to call from the Server environment'
		);
	}

	const client = new PocketBase(pbUrl) as TypedPocketBase;

	return client;
}
