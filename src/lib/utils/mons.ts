/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

interface PokeAPIResponse {
	flavor_text_entries: {
		flavor_text: string;
		language: {
			name: string;
		};
	}[];
	names: {
		name: string;
		language: {
			name: string;
		};
	}[];
	color: {
		name: string;
	};
}

export interface Pokemon {
	name: string;
	description: string;
	sprite: string;
	class: string;
}

export async function getRandomPokemon(): Promise<Pokemon> {
	const id = Math.floor(Math.random() * 1024) + 1; // max 1025
	return await getPokemonDetails(+id);
}

async function getPokemonDetails(id: number): Promise<Pokemon> {
	const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
	const response = (await (await fetch(url)).json()) as PokeAPIResponse;

	const description = response.flavor_text_entries
		.find((entry) => entry.language.name === "en")
		?.flavor_text.replace(/(?:\n|\f)/g, " ");

	const name = response.names.find((name) => name.language.name === "en")?.name;

	return {
		name: name || "",
		description: description || "",
		sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
		class: `i${id}`
	};
}
