/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createServerClient } from "@pocketbase/config";
import { getThought, getThoughts } from "@pocketbase/req";
import type { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";
import { forbidden, notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = false;

export async function generateStaticParams() {
	const thoughtsResponse = await getThoughts(1, 20, { sort: "created" });

	if (isError(thoughtsResponse)) {
		console.error("Could not get thoughts");
		return [];
	}

	const thoughts = thoughtsResponse as Thought[];

	return thoughts.map((thought) => ({
		slug: thought.slug
	}));
}

const hasValidOrigin = (request: Request): boolean => {
	const { href } = new URL(request.url);
	const { href: refferer } = new URL(
		request.headers.get("Referer") || process.env.SITE_URL
	);
	return href === refferer.concat("/download");
};

export async function GET(request: Request) {
	const { pathname } = new URL(request.url);
	const slug = pathname.split("/").at(-2);

	if (!slug) {
		return notFound();
	}

	const validOrigin = hasValidOrigin(request);
	if (!validOrigin) {
		return forbidden();
	}

	const client = createServerClient();
	const thoughtResponse = await getThought(client, slug);
	console.log(thoughtResponse);
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
