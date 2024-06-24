// write a script to be launched with node to scarpe all pokemon data from pokeapi.co
import ColorThief from 'colorthief';
import fs from 'fs';

function rgbToHex(r, g, b) {
	const hex = (r << 16) | (g << 8) | b;
	return '#' + hex.toString(16).padStart(6, '0');
}

function hexToRgb(hex) {
	const bigint = parseInt(hex.slice(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
}

function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

function roundToNearest(value, multiple) {
	return Math.round(value / multiple) * multiple;
}

function reduceColorSpace(rgb, multiple = 32) {
	return rgb.map((value) => clamp(roundToNearest(value, multiple), 0, 255));
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

const writeJsonDataToFile = (data) => {
	fs.writeFileSync('pokemon.json', JSON.stringify(data));
};

const generateCSSColors = (data) => {
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
		cssContent += `.${className} { color: ${color}; }`;
	}

	data.forEach((item) => {
		item.c = item.className;
		item.className = undefined;
	});

	fs.writeFile('pokemons.css', cssContent, (err) => {
		if (err) {
			console.error('Error writing to CSS file', err);
		} else {
			console.log('CSS file generated successfully');
		}
	});
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
	const color = await ColorThief.getColor(
		`./public/pokemon/${pokemon.n}.png`,
		1 // because 96x96 is a small image
	);
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

	for (let i = 0; i < pokemons.length; i++) {
		await updatePokemonColor(pokemons[i]);
	}

	console.log('Saving pokemon data...');

	writeJsonDataToFile(pokemons);
	generateCSSColors(pokemons);
}

async function regenerateColors() {
	const pokemons = JSON.parse(fs.readFileSync('public/pokemon.json', 'utf8'));
	for (const pokemon of pokemons) {
		await updatePokemonColor(pokemon);
	}

	generateCSSColors(pokemons);
	writeJsonDataToFile(pokemons);
}

regenerateColors();
