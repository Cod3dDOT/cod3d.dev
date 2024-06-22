//read file from public folder
import { stringToUniqueId } from '@/lib/math';
import { getPB } from '@/lib/pocketbase/config';
import fs from 'fs';
import { redirect } from 'next/navigation';
import path from 'path';

const __dirname = path.resolve('./public');
const filePath = path.join(__dirname, 'pokemon.json');
const mons = JSON.parse(fs.readFileSync(filePath, 'utf8'));

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
	if (request.headers.get('accept') !== 'application/json') {
		redirect('/404');
	}

	const hashedToken = stringToUniqueId(
		(await getPB()).authStore.token
	).toString();

	console.log(request.headers.get('X-S'), hashedToken);

	if (request.headers.get('X-S') !== hashedToken) {
		redirect('/404');
	}

	// return random pokemon
	const index = Math.floor(Math.random() * mons.length);
	const pokemon = mons[index];
	return Response.json(pokemon);
}
