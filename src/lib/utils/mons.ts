/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { imageToData } from "./image";

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
	id: number;
	name: string;
	description: string;
	class: string;
	sprite: Promise<string>;
}

export async function getRandomPokemon(): Promise<Pokemon> {
	const id = Math.floor(Math.random() * 1024) + 1; // max 1025
	try {
		return await getPokemonDetails(+id);
	} catch (e) {
		return {
			id: 175,
			name: "Togepi",
			description: "Oops! It seems something went wrong. Togepi is now sad.",
			class: "i175",
			sprite: imageToData(`${process.env.SITE_URL}/img/sad-togepi.webp`)
		};
	}
}

async function getPokemonSprite(id: number) {
	const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

	return imageToData(url);
}

async function getPokemonDetails(id: number): Promise<Pokemon> {
	const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
	const response = await fetch(url);

	if (!response.ok) {
		return {
			id: 175,
			name: "Togepi",
			description: "Oops! It seems something went wrong. Togepi is now sad.",
			class: "i175",
			sprite: imageToData(`${process.env.SITE_URL}/img/sad-togepi.webp`)
		};
	}

	const json = (await response.json()) as PokeAPIResponse;

	const description = json.flavor_text_entries
		.find((entry) => entry.language.name === "en")
		?.flavor_text.replace(/(?:\n|\f)/g, " ");

	const name = json.names.find((name) => name.language.name === "en")?.name;

	return {
		id,
		name: name || "",
		description: description || "",
		class: `i${id}`,
		sprite: getPokemonSprite(id)
	};
}
