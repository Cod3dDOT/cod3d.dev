import fs from 'fs';
import {
	colorFromImage,
	rgbToHex,
	hexToRgb,
	reduceColorSpace,
	writeFile
} from './generate-utils.mjs';

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

const generateCSSFile = (path, data) => {
	const colorToClass = {};
	let classCounter = 1;

	data.forEach((item) => {
		const rgb = hexToRgb(item.c);
		const reducedRgb = reduceColorSpace(rgb);
		const reducedHex = rgbToHex(...reducedRgb);

		if (!colorToClass[reducedHex]) {
			colorToClass[reducedHex] = `mon${classCounter++}`;
		}
		item.className = colorToClass[reducedHex];
	});

	let cssContent = '';

	for (const [color, className] of Object.entries(colorToClass)) {
		cssContent += `.${className}{color:${color};}`;
	}

	data.forEach((item) => {
		item.c = parseInt(item.className.substring(3));
		item.className = undefined;
	});

	writeFile(path, cssContent);
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
	const color = await colorFromImage(`./public/pokemon/${pokemon.n}.png`);
	pokemon.c = rgbToHex(...color);
};

async function fetch() {
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

	for (const pokemon of pokemons) {
		await updatePokemonColor(pokemon);
	}

	console.log('Saving pokemon data...');

	generateCSSFile('pokemons.css', pokemons);
	writeFile('pokemons.json', JSON.stringify(pokemons));
}

async function regenerateColors(path) {
	const pokemons = JSON.parse(fs.readFileSync(path, 'utf8'));
	for (const pokemon of pokemons) {
		await updatePokemonColor(pokemon);
	}

	generateCSSFile('pokemons.css', pokemons);
	writeFile('pokemons.json', JSON.stringify(pokemons));
}

regenerateColors('public/pokemons.json');
