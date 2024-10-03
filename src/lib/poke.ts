import fs from 'fs';
import path from 'path';

const __dirname = path.resolve('./public/pokemon/');
const filePath = path.join(__dirname, '_mons.json');
const mons = JSON.parse(fs.readFileSync(filePath, 'utf8'));

export interface Pokemon {
	name: string;
	description: string;
	sprite: string;
	class: string;
}

export function getRandomPokemon(): Pokemon {
	const index = Math.floor(Math.random() * mons.length);
	const pokemon = mons[index];

	return {
		name: pokemon.n,
		description: pokemon.d,
		sprite: `/pokemon/${pokemon.n}.png`,
		class: 'mon' + pokemon.c
	};
}
