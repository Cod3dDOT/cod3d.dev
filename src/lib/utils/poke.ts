import fs from "fs";
import path from "path";

interface PokemonSave {
	n: string;
	d: string;
	c: string;
}

export interface Pokemon {
	name: string;
	description: string;
	sprite: string;
	class: string;
}

const __directory = path.resolve("./public/pokemon/");
const __path = path.join(__directory, "_mons.json");
const mons = JSON.parse(fs.readFileSync(__path, "utf8")) as PokemonSave[];

export function getRandomPokemon(): Pokemon {
	const index = Math.floor(Math.random() * mons.length);
	const pokemon = mons[index];

	return {
		name: pokemon.n,
		description: pokemon.d,
		sprite: `/pokemon/image/${pokemon.n}.png`,
		class: "mon" + pokemon.c,
	};
}
