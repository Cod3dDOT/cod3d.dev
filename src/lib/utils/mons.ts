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
		id,
		name: name || "",
		description: description || "",
		class: `i${id}`
	};
}

export async function getPokemonSprite(id: number) {
	const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

	return imageToData(url);
}
