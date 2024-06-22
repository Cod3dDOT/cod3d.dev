// write a script to be launched with node to scarpe all pokemon data from pokeapi.co
import ColorThief from 'colorthief';
import fs from 'fs';

function rgbToHex(r, g, b) {
	const hex = (r << 16) | (g << 8) | b;
	return '#' + hex.toString(16).padStart(6, '0');
}

async function getAllPokemonSpecies() {
	const url = 'https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0';
	const response = await fetch(url);
	const data = await response.json();
	return data.results;
}

async function getPokemonSpecies(id) {
	const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
	const response = await fetch(url);
	return await response.json();
}

async function getPokemon(id) {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const response = await fetch(url);
	return await response.json();
}

const writeToFile = (data) => {
	fs.writeFileSync('pokemon.json', JSON.stringify(data));
};

const getFormattedPokemon = async (id) => {
	const speciesData = await getPokemonSpecies(id);
	const pokemonData = await getPokemon(speciesData.name);

	const description = speciesData.flavor_text_entries
		.find((x) => x.language.name == 'en')
		.flavor_text.replace(/(?:\n|\f)/g, ' ');

	return {
		n: speciesData.names.find((x) => x.language.name == 'en').name,
		d: description,
		s: pokemonData.sprites.front_default,
		c: speciesData.color.name
	};
};

const savePokemonImage = async (pokemon) => {
	const image = await fetch(pokemon.s);
	const buffer = await image.arrayBuffer();
	fs.writeFileSync(`./public/pokemon/${pokemon.n}.png`, Buffer.from(buffer));
	pokemon.s = undefined;
};

const updatePokemonColor = async (pokemon) => {
	const color = await ColorThief.getColor(`./public/pokemon/${pokemon.n}.png`);
	pokemon.c = rgbToHex(...color);
};

async function main() {
	const species = await getAllPokemonSpecies();
	const pokemons = [];

	console.log('Fetching pokemons...');

	for (let i = 0; i < species.length; i++) {
		try {
			pokemons.push(await getFormattedPokemon(i + 1));
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

	for (let i = 0; i < pokemons.length; i++) {
		await updatePokemonColor(pokemons[i]);
	}

	console.log('Saving pokemon data...');

	writeToFile(pokemons);
}

main();
