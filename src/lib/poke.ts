import { getBaseUrl } from './getUrl';

export interface Pokemon {
	name: string;
	description: string;
	sprite: string;
	color: string;
}

export async function getRandomPokemon(): Promise<Pokemon> {
	const url = getBaseUrl() + '/api/poke';
	const pokemon = await (await fetch(url)).json();

	return {
		name: pokemon.n,
		description: pokemon.d,
		sprite: `/pokemon/${pokemon.n}.png`,
		color: pokemon.c
	};
}
