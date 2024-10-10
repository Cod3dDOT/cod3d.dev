import { extractColors } from 'extract-colors';
import { FinalColor } from 'extract-colors/lib/types/Color';
import fs from 'fs';
import sharp from 'sharp';

export class Color {
	r: number;
	g: number;
	b: number;

	constructor(r: number, g: number, b: number) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	fromHex(hex: string) {
		const bigint = parseInt(hex.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return new Color(r, g, b);
	}

	toHex() {
		const hex = (this.r << 16) | (this.g << 8) | this.b;
		return '#' + hex.toString(16).padStart(6, '0');
	}

	reduced(multiple: number) {
		return new Color(
			clamp(roundToNearest(this.r, multiple), 0, 255),
			clamp(roundToNearest(this.g, multiple), 0, 255),
			clamp(roundToNearest(this.b, multiple), 0, 255)
		);
	}
}

export function clamp(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

export function roundToNearest(value: number, multiple: number): number {
	return Math.round(value / multiple) * multiple;
}

export async function colorFromImage(path: string): Promise<Color> {
	const { data, info } = await sharp(path)
		.raw()
		.toBuffer({ resolveWithObject: true });

	const colors = await extractColors({
		data: new Uint8ClampedArray(data),
		width: info.width,
		height: info.height
	});

	const sortedByArea = colors.sort((a, b) => b.area - a.area);

	// select the most vibrant color out of the top 2 if the difference in area is not large
	// considering that pokemons are 96x96 and usually have 2 or 3 primary colors, we can
	// allow a 30% difference in area

	let vibrant: FinalColor;

	if (
		sortedByArea.length > 1 &&
		Math.abs(sortedByArea[0].area - sortedByArea[1].area) < 0.3
	) {
		vibrant =
			sortedByArea[0].saturation * sortedByArea[0].intensity >
			sortedByArea[1].saturation * sortedByArea[1].intensity
				? sortedByArea[0]
				: sortedByArea[1];
	} else {
		vibrant = sortedByArea[0];
	}

	return new Color(vibrant.red, vibrant.green, vibrant.blue);
}

export const writeFile = (path: string, data: string): void => {
	try {
		fs.writeFileSync(path, data);
		console.log(`${path} generated successfully`);
	} catch (error) {
		console.error(`Error writing to ${path}`, error);
	}
};
