import PocketBase from 'pocketbase';

import { TypedPocketBase } from './types';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function createServerClient() {
	const pbUrl = process.env.PB_URL;

	if (!pbUrl) throw new Error('Invalid .env database config');

	if (typeof window !== 'undefined') {
		throw new Error(
			'This method is only supposed to call from the Server environment'
		);
	}

	const client = new PocketBase(pbUrl) as TypedPocketBase;

	return client;
}
