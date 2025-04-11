import fs from "fs";

import { colorFromImage, writeFile } from "./generate-utils";
import {
	API_getAllPokemonSpecies,
	API_getPokemonByName,
	API_getPokemonSpecies,
} from "./pokeApi";

interface Pokemon {
	name: string;
	description: string;
	spriteUrl?: string;
	className?: string;
	colorHex?: string;
}

interface PokemonSave {
	n: string;
	d: string;
	c: string;
}

const generateCSSFile = async (
	path: string,
	imageFolder: string,
	mons: Pokemon[]
) => {
	const colorToClass: { [key: string]: string } = {};
	let classCounter = 1;

	for (const pokemon of mons) {
		const dominantColor = await colorFromImage(
			`${imageFolder}${pokemon.name}.png`
		);

		const reducedColor = dominantColor.reduced(32);
		const reducedHex = reducedColor.toHex();

		if (!(reducedHex in colorToClass)) {
			colorToClass[reducedHex] = `mon${classCounter++}`;
		}

		pokemon.colorHex = reducedHex;
		pokemon.className = colorToClass[reducedHex];
	}

	const cssContent = Object.entries(colorToClass)
		.map(([color, className]) => `.${className}{--c:${color}}`)
		.join("");

	writeFile(path, cssContent);
	return mons;
};

function savePokemons(path: string, pokemons: Pokemon[]): void {
	const savePokemons: PokemonSave[] = pokemons.map((pokemon: Pokemon) => {
		return {
			n: pokemon.name,
			d: pokemon.description,
			c: pokemon.className?.substring(3) || "mon0",
		};
	});

	writeFile(path, JSON.stringify(savePokemons));
}

function updateProgressBar(current: number, total: number): void {
	const barLength = 40; // Length of the progress bar in characters
	const progress = Math.floor((current / total) * barLength);
	const bar = "█".repeat(progress) + "░".repeat(barLength - progress);
	const percentage = ((current / total) * 100).toFixed(2);

	// Clear the current line and print the progress bar
	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	process.stdout.write(
		`Progress: [${bar}] ${percentage}% (${current}/${total})`
	);
}

async function savePokemonImage(
	pokemon: Pokemon,
	folder: string
): Promise<void> {
	if (!pokemon.spriteUrl) {
		console.log(`No sprite URL for ${pokemon.name}`);
		return;
	}
	const response = await fetch(pokemon.spriteUrl);
	const buffer = await response.arrayBuffer();
	fs.writeFileSync(`${folder}/${pokemon.name}.png`, Buffer.from(buffer));
}

async function getPokemonById(id: number): Promise<Pokemon> {
	const speciesData = await API_getPokemonSpecies(id);
	const pokemonData = await API_getPokemonByName(speciesData.id.toString());
	const description = speciesData.flavor_text_entries
		.find((entry) => entry.language.name === "en")
		?.flavor_text.replace(/(?:\n|\f)/g, " ");

	const englishName = speciesData.names.find(
		(name) => name.language.name === "en"
	)?.name;

	return {
		name: englishName || speciesData.name,
		description: description || "No description available",
		spriteUrl: pokemonData.sprites.front_default,
	};
}

// Fetch Pokémon data concurrently and log the progress in a table
async function fetchFromPokeAPI(
	folder: string,
	imageFolder: string,
	jsonPath: string,
	cssPath: string
): Promise<void> {
	const species = await API_getAllPokemonSpecies();

	const tableData: Array<{ Name: string; Status: string }> = [];
	const total = species.length;
	let completed = 0;

	console.log("Fetching Pokémon data...");

	async function fetchPokemon(
		speciesData: { name: string },
		id: number,
		folder: string,
		tableData: Array<{ Name: string; Status: string }>,
		total: number
	): Promise<Pokemon | null> {
		try {
			const pokemon = await getPokemonById(id);
			tableData.push({ Name: speciesData.name, Status: "✅" });
			await savePokemonImage(pokemon, folder);
			return pokemon;
		} catch (error) {
			console.error(
				`Failed to fetch Pokémon ${speciesData.name}:`,
				error
			);
			tableData.push({ Name: speciesData.name, Status: "❌" });
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

	console.log("Generating Pokémon CSS...");
	await generateCSSFile(cssPath, imageFolder, pokemons);

	console.log("Saving Pokémon data...");
	savePokemons(jsonPath, pokemons);
}

const args = process.argv.slice(2);
const command = args.at(0);

const path = "./public/pokemon/";
const imageFolder = "./public/pokemon/image/";
const jsonPath = "./public/pokemon/_mons.json";
const stylePath = "./public/pokemon/pokemons.css";

if (command === "generate") {
	if (!fs.existsSync(path) || !fs.existsSync(imageFolder)) {
		fs.mkdirSync(path);
		fs.mkdirSync(imageFolder);
	}
	fetchFromPokeAPI(path, imageFolder, jsonPath, stylePath);
}
