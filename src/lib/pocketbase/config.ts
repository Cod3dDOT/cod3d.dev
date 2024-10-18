import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import PocketBase from 'pocketbase';

import { TypedPocketBase } from './types';

export async function createServerClient(cookieStore?: ReadonlyRequestCookies) {
	const pbUrl = 'https://' + process.env.POCKETBASE_HOST;

	if (!pbUrl) throw new Error('Invalid .env database config');

	if (typeof window !== 'undefined') {
		throw new Error(
			'This method is only supposed to call from the Server environment'
		);
	}

	const client = new PocketBase(pbUrl) as TypedPocketBase;

	if (cookieStore) {
		const authCookie = cookieStore.get('pb_auth');

		if (authCookie) {
			client.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
		}
	}

	return client;
}
