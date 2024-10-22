import { notFound } from 'next/navigation';

import { createServerClient } from '@/lib/pocketbase/config';
import { getThought } from '@/lib/pocketbase/req';
import { Thought } from '@/lib/pocketbase/types';
import { isError } from '@/lib/pocketbase/utils';

export const revalidate = 86400;

export async function GET(request: Request) {
	const { pathname, origin } = new URL(request.url);

	const referer = request.headers.get('referer');
	const refererUrl = referer ? new URL(referer) : null;

	if (refererUrl?.origin != origin) {
		return new Response(null, { status: 403 });
	}

	const slug = pathname.split('/').at(-2);
	if (!slug) {
		return notFound();
	}

	const client = await createServerClient();
	const thoughtResponse = await getThought(client, slug);
	if (isError(thoughtResponse)) {
		return notFound();
	}

	const thought = thoughtResponse as Thought;
	const markdownResponse = await fetch('https://cod3d.dev' + thought.markdown);

	if (!markdownResponse.ok) {
		return notFound();
	}

	return new Response(markdownResponse.body, {
		status: 200,
		headers: {
			'Content-Type': 'text/markdown; charset=UTF-8',
			'Content-Disposition': `attachment; filename="${slug}.md"`,
			'Transfer-Encoding': 'chunked'
		}
	});
}
