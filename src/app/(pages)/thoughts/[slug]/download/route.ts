import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createServerClient } from "@pocketbase/config";
import { getThought } from "@pocketbase/req";
import { Thought } from "@pocketbase/types";
import { isError } from "@pocketbase/utils";

import { verifyToken } from "@/lib/utils/crypto";

export const revalidate = 86400;

const SECRET = new TextEncoder().encode(process.env.PRIVATE_DOWNLOAD_KEY);

const hasValidOrigin = (request: Request) => {
	const { origin } = new URL(request.url);
	const referer = request.headers.get("referer");
	const refererUrl = referer ? new URL(referer) : null;

	return refererUrl?.origin == origin;
};

const hasValidToken = async (slug: string) => {
	const tokenCookie = (await cookies()).get("token")?.value;

	if (!tokenCookie) {
		return new Response(null, { status: 401 });
	}

	const [expiresAt, signedToken] = tokenCookie.split("_");
	const tokenData = `${slug}:${expiresAt}`;
	const isValid = await verifyToken(tokenData, signedToken, SECRET);

	const expired = new Date(expiresAt) > new Date();
	return isValid && !expired;
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

	const validToken = await hasValidToken(slug);
	if (!validToken) {
		return new Response(null, { status: 403 });
	}

	const client = createServerClient();
	const thoughtResponse = await getThought(client, slug);
	if (isError(thoughtResponse)) {
		return notFound();
	}

	const thought = thoughtResponse as Thought;
	const markdownResponse = await fetch(
		"https://cod3d.dev" + thought.markdown
	);

	if (!markdownResponse.ok) {
		return notFound();
	}

	return new Response(markdownResponse.body, {
		status: 200,
		headers: {
			"Content-Type": "text/markdown; charset=UTF-8",
			"Content-Disposition": `attachment; filename="${slug}.md"`,
			"Transfer-Encoding": "chunked",
		},
	});
}
