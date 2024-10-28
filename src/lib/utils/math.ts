import { splitmix32, stringToUniqueId } from './crypto';

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

export function shuffleArray<T>(array: T[], seed: string) {
	function random(seed: number) {
		var x = Math.sin(seed++) * 10000;
		return x - Math.floor(x);
	}

	for (let i = array.length - 1; i > 0; i--) {
		const r = random(stringToUniqueId(seed));
		const j = Math.floor(r * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
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

export const lerp = (start: number, end: number, factor: number) => {
	return start + (end - start) * factor;
};
