function splitmix32(a: number) {
	a |= 0;
	a = (a + 0x9e3779b9) | 0;
	let t = a ^ (a >>> 16);
	t = Math.imul(t, 0x21f0aaad);
	t = t ^ (t >>> 15);
	t = Math.imul(t, 0x735a2d97);
	return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
}

export function randomIntFromIntervalPredicted(
	min: number,
	max: number,
	seed: number = Date.now() * Math.random()
) {
	return Math.floor(splitmix32(seed) * (max - min + 1) + min);
}

export function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function remapRange(
	value: number,
	fromMin: number,
	fromMax: number,
	toMin: number,
	toMax: number
): number {
	const proportion = (value - fromMin) / (fromMax - fromMin);
	return toMin + proportion * (toMax - toMin);
}

export function stringToUniqueId(str: string, seed = 0) {
	let h1 = 0xdeadbeef ^ seed,
		h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}
