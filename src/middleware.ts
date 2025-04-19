import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { encryptPayload } from "./lib/utils/crypto";

const VALID_FOR_MINUTES = 10;

export const config = {
	matcher: [
		{
			// Matches /thoughts/[slug] but not prefetch requests
			source: "/thoughts/:slug",
			missing: [
				{ type: "header", key: "next-router-prefetch" },
				{ type: "header", key: "purpose", value: "prefetch" }
			]
		}
	]
};

export async function middleware(request: NextRequest) {
	const match = request.nextUrl.pathname.match(/\/thoughts\/([^/]+)$/);
	if (!match) return NextResponse.next();

	const slug = match[1];
	const expiresAt = Date.now() + VALID_FOR_MINUTES * 60 * 1000;
	const payload = JSON.stringify({ slug, expiresAt });
	const token = await encryptPayload(payload, process.env.PRIVATE_DOWNLOAD_KEY);

	const response = NextResponse.next();
	response.cookies.set("token", token, {
		httpOnly: true,
		secure: true,
		sameSite: "strict",
		maxAge: VALID_FOR_MINUTES * 60,
		path: `${request.nextUrl.pathname}/download`
	});

	return response;
}
