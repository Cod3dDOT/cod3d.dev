/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createServerClient } from "@pocketbase/config";
import { getThought } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import { notFound } from "next/navigation";

export const revalidate = 86400;

const hasValidOrigin = (request: Request): boolean => {
	const { origin } = new URL(request.url);
	const referer = request.headers.get("referer");
	const refererUrl = referer ? new URL(referer) : null;

	return refererUrl?.origin === origin;
};

export async function GET(request: Request) {
	const { pathname } = new URL(request.url);
	const slug = pathname.split("/").at(-2);

	if (!slug) {
		return notFound();
	}

	const validOrigin = hasValidOrigin(request);
	if (!validOrigin) {
		return new Response(null, { status: 403 });
	}

	const client = createServerClient();
	const thoughtResponse = await getThought(client, slug);
	if (isError(thoughtResponse)) {
		return notFound();
	}

	const thought = thoughtResponse as Thought;
	const markdownResponse = await fetch(thought.markdown);

	if (!markdownResponse.ok) {
		return notFound();
	}

	return new Response(markdownResponse.body, {
		status: 200,
		headers: {
			"Content-Type": "text/markdown; charset=UTF-8",
			"Content-Disposition": `attachment; filename="${slug}.md"`,
			"Transfer-Encoding": "chunked"
		}
	});
}
