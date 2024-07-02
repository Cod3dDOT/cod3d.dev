import fs from 'fs';
import { colorFromImage, writeFile } from './generate-utils.ts';
import {
	API_getAllPokemonSpecies,
	API_getPokemonByName,
	API_getPokemonSpecies
} from './pokeApi.ts';

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

const generateCSSFile = async (path: string, mons: Pokemon[]) => {
	const colorToClass: { [key: string]: string } = {};
	let classCounter = 1;

	for (const pokemon of mons) {
		const dominantColor = await colorFromImage(
			`./public/pokemon/${pokemon.name}.png`
		);

		const reducedColor = dominantColor.reduced(32);
		const reducedHex = reducedColor.toHex();

		if (!(reducedHex in colorToClass)) {
			colorToClass[reducedHex] = `mon${classCounter++}`;
		}

		pokemon.colorHex = reducedHex;
		pokemon.className = colorToClass[reducedHex];
	}

	let cssContent = Object.entries(colorToClass)
		.map(([color, className]) => `.${className}{color:${color}}`)
		.join('');

	writeFile(path, cssContent);
	return mons;
};

const getPokemonById = async (id: number): Promise<Pokemon> => {
	const speciesData = await API_getPokemonSpecies(id);
	const pokemonData = await API_getPokemonByName(speciesData.name);

	const description = speciesData.flavor_text_entries
		.find((x) => x.language.name == 'en')!
		.flavor_text.replace(/(?:\n|\f)/g, ' ');

	const englishName = speciesData.names.find(
		(name) => name.language.name == 'en'
	)?.name;

	return {
		name: englishName || speciesData.name,
		description: description,
		spriteUrl: pokemonData.sprites.front_default
	};
};

const savePokemonImage = async (pokemon: Pokemon): Promise<void> => {
	if (!pokemon.spriteUrl) {
		console.log('No sprite url for ' + pokemon.name);
		return;
	}

	const image = await fetch(pokemon.spriteUrl);
	const buffer = await image.arrayBuffer();
	fs.writeFileSync(`./public/pokemon/${pokemon.name}.png`, Buffer.from(buffer));
};

async function fetchFromPokeAPI(): Promise<void> {
	const species = await API_getAllPokemonSpecies();
	const pokemons: Pokemon[] = [];

	console.log('Fetching pokemons...');

	for (let i = 0; i < species.length; i++) {
		try {
			pokemons.push(await getPokemonById(i + 1));
			console.log(i + 1 + ': ' + species[i].name + ' - done');
		} catch (e) {
			console.log(i + 1 + ': ' + species[i].name + ' - failed');
		}
	}

	console.log('Saving pokemon images...');

	for (let i = 0; i < pokemons.length; i++) {
		await savePokemonImage(pokemons[i]);
	}

	console.log('Generating pokemon colors...');

	generateCSSFile('pokemons.css', pokemons);

	console.log('Saving pokemon data...');
	savePokemons('public/pokemons.json', pokemons);
}

function loadFromSave(path: string): Pokemon[] {
	let savedPokemons = JSON.parse(fs.readFileSync(path, 'utf8'));

	return savedPokemons.map((pokemon: PokemonSave) => {
		return {
			name: pokemon.n,
			description: pokemon.d
		};
	});
}

function savePokemons(path: string, pokemons: Pokemon[]): void {
	const savePokemons: PokemonSave[] = pokemons.map((pokemon: Pokemon) => {
		return {
			n: pokemon.name,
			d: pokemon.description,
			c: pokemon.className?.substring(3) || 'mon0'
		};
	});

	writeFile(path, JSON.stringify(savePokemons));
}

async function regenerateColors(savePath: string): Promise<void> {
	const pokemons: Pokemon[] = loadFromSave(savePath);

	const withColors = await generateCSSFile(
		'src/app/styles/pokemons.css',
		pokemons
	);

	savePokemons('public/pokemons.json', withColors);
}

regenerateColors('public/pokemons.json');
