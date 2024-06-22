//read file from public folder
import { stringToUniqueId } from '@/lib/math';
import { pb } from '@/lib/pocketbase/config';
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

	if (
		request.headers.get('X-S') !==
		stringToUniqueId(pb.authStore.token).toString()
	) {
		redirect('/404');
	}

	// return random pokemon
	const index = Math.floor(Math.random() * mons.length);
	const pokemon = mons[index];
	return Response.json(pokemon);
}
