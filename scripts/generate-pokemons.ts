/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { colorFromImage } from "./utils/color-utils";
import { pokeApi } from "./pokeApi";
import { createFolder, removeFolder, writeFile } from "./utils/file-utils";
import { updateProgressBar } from "./utils/cli-utils";

interface Pokemon {
	id: number;
	spriteUrl?: string;
	colorHex?: string;
}

const withColors = async (imageFolder: string, mons: Pokemon[]) => {
	const pokemonsWithColors: Pokemon[] = await Promise.all(
		mons.map(async (pokemon) => {
			const dominantColor = await colorFromImage(
				`${imageFolder}${pokemon.id}.png`
			);

			const reducedColor = dominantColor.to3DigitHex();

			return {
				...pokemon,
				colorHex: reducedColor
			};
		})
	);

	return pokemonsWithColors;
};

function savePokemons(path: string, pokemons: Pokemon[]): void {
	const classEntries = pokemons
		.filter((pokemon) => pokemon.colorHex)
		.map((pokemon) => `.i${pokemon.id}{--c:${pokemon.colorHex}}`)
		.join("");

	const cssContent = `.mons{${classEntries}}`;

	writeFile(path, cssContent);
}

async function savePokemonImage(
	pokemon: Pokemon,
	folder: string
): Promise<void> {
	if (!pokemon.spriteUrl) {
		console.log(`No sprite URL for ${pokemon.id}`);
		return;
	}
	const response = await fetch(pokemon.spriteUrl);
	const buffer = await response.arrayBuffer();
	writeFile(`${folder}/${pokemon.id}.png`, Buffer.from(buffer));
}

async function getPokemonById(id: number): Promise<Pokemon> {
	const speciesData = await pokeApi.getPokemonSpecies(id);
	const pokemonData = await pokeApi.getPokemonByName(speciesData.id.toString());

	return {
		id: speciesData.id,
		spriteUrl: pokemonData.sprites.front_default
	};
}

// Fetch Pokémon data concurrently and log the progress in a table
async function fetchFromPokeAPI(
	imageFolder: string,
	jsonPath: string
): Promise<void> {
	const species = await pokeApi.getAllPokemonSpecies();

	const tableData: Array<{ name: string; success: boolean }> = [];
	const total = species.length;
	let completed = 0;

	console.log("Fetching Pokémon data...");

	async function fetchPokemon(
		speciesData: { name: string },
		id: number,
		folder: string,
		tableData: Array<{ name: string; success: boolean }>,
		total: number
	): Promise<Pokemon | null> {
		try {
			const pokemon = await getPokemonById(id);
			tableData.push({ name: speciesData.name, success: true });
			await savePokemonImage(pokemon, folder);
			return pokemon;
		} catch (error) {
			tableData.push({ name: speciesData.name, success: false });
			return null;
		} finally {
			updateProgressBar(++completed, total);
		}
	}

	const promises = species.map((speciesData, index) =>
		fetchPokemon(speciesData, index + 1, imageFolder, tableData, total)
	);

	const pokemons = (await Promise.all(promises)).filter(Boolean) as Pokemon[];

	console.log("\n"); // Add a new line after the progress bar completes

	console.log("Updating Pokémon data with colors...");
	const pokemonsWithColors = await withColors(imageFolder, pokemons);

	console.log("Saving Pokémon data...");
	savePokemons(jsonPath, pokemonsWithColors);

	console.log("Cleaning up...");
	removeFolder(imageFolder);
}

const args = process.argv.slice(2);
const command = args.at(0);

const path = "./scripts/generated-assets/";
const imageFolder = `${path}cached-images/`;
const cssPath = `${path}mons.css`;

if (command === "generate") {
	createFolder(path);
	createFolder(imageFolder);

	fetchFromPokeAPI(imageFolder, cssPath);
}
