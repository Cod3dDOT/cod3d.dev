import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import PocketBase from "pocketbase";

import type { TypedPocketBase } from "./types";

export function createServerClient(cookieStore?: ReadonlyRequestCookies) {
	if (!process.env.POCKETBASE_HOST)
		throw new Error("Invalid .env database config");

	const pbUrl = `https://${process.env.POCKETBASE_HOST}`;

	if (typeof window !== "undefined") {
		throw new Error(
			"This method is only supposed to call from the Server environment"
		);
	}

	const client = new PocketBase(pbUrl) as TypedPocketBase;

	// client.authStore.onChange(() => {
	// 	const cookie = client.authStore.exportToCookie({
	// 		httpOnly: true,
	// 		secure: true,
	// 		sameSite: 'strict',
	// 		path: '/'
	// 	});

	// 	cookies().set('pb_auth', cookie.split('pb_auth=')[1]);
	// });

	if (cookieStore) {
		const authCookie = cookieStore.get("pb_auth");

		if (authCookie) {
			client.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
		}
	}

	return client;
}
