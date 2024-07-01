import PocketBase from 'pocketbase';

import { TypedPocketBase } from './types';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

let singletonClient: TypedPocketBase | null = null;

export function createBrowserClient() {
	if (!process.env.NEXT_PUBLIC_POCKETBASE_API_URL) {
		throw new Error('Pocketbase API url not defined !');
	}

	const createNewClient = () => {
		return new PocketBase(
			process.env.NEXT_PUBLIC_POCKETBASE_API_URL
		) as TypedPocketBase;
	};

	const _singletonClient = singletonClient ?? createNewClient();

	if (typeof window === 'undefined') return _singletonClient;

	if (!singletonClient) singletonClient = _singletonClient;

	singletonClient.authStore.onChange(() => {
		document.cookie = singletonClient!.authStore.exportToCookie({
			httpOnly: false
		});
	});

	return singletonClient;
}

export async function createServerClient(cookieStore?: ReadonlyRequestCookies) {
	const pbUrl = process.env.PB_URL;
	const pbUser = process.env.PB_USER;
	const pbPass = process.env.PB_PASS;

	if (!pbUrl || !pbUser || !pbPass)
		throw new Error('Invalid .env database config');

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
	} else {
		const authData = await client
			.collection('users')
			.authWithPassword(pbUser, pbPass);

		client.authStore.save(authData.token);
	}

	return client;
}
