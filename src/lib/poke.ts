import { getBaseUrl } from './getUrl';
import { stringToUniqueId } from './math';
import { pb } from './pocketbase/config';

export interface Pokemon {
	name: string;
	description: string;
	sprite: string;
	color: string;
}

export async function getRandomPokemon(): Promise<Pokemon> {
	const url = getBaseUrl() + '/api/poke';

	const hashedToken = stringToUniqueId(pb.authStore.token);

	const pokemon = await (
		await fetch(url, {
			method: 'GET',
			cache: 'no-cache',
			// @ts-expect-error
			headers: { accept: 'application/json', 'X-S': hashedToken }
		})
	).json();

	return {
		name: pokemon.n,
		description: pokemon.d,
		sprite: `/pokemon/${pokemon.n}.png`,
		color: pokemon.c
	};
}
