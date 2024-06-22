//read file from public folder
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve('./public');
const filePath = path.join(__dirname, 'pokemon.json');
const mons = JSON.parse(fs.readFileSync(filePath, 'utf8'));

export async function GET(request: Request) {
	// return random pokemon
	const index = Math.floor(Math.random() * mons.length);
	const pokemon = mons[index];
	return Response.json(pokemon);
}
