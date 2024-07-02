interface PokemonSpecies {
	name: string;
	url: string;
}

interface PokemonSpeciesData {
	flavor_text_entries: FlavorTextEntry[];
	name: string;
	names: Name[];
	color: Color;
}

interface FlavorTextEntry {
	language: Language;
	flavor_text: string;
}

interface Language {
	name: string;
}

interface Name {
	language: Language;
	name: string;
}

interface Color {
	name: string;
}

interface PokemonData {
	sprites: Sprites;
}

interface Sprites {
	front_default: string;
}

export async function API_getAllPokemonSpecies(): Promise<PokemonSpecies[]> {
	const url = 'https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0';
	const response = await fetch(url);
	const data = await response.json();
	return data.results;
}

export async function API_getPokemonSpecies(
	id: number
): Promise<PokemonSpeciesData> {
	const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
	const response = await fetch(url);
	return await response.json();
}

export async function API_getPokemonByName(name: string): Promise<PokemonData> {
	const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
	const response = await fetch(url);
	return await response.json();
}
