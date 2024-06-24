import ColorThief from 'colorthief';
import fs from 'fs';

export function rgbToHex(r, g, b) {
	const hex = (r << 16) | (g << 8) | b;
	return '#' + hex.toString(16).padStart(6, '0');
}

export function hexToRgb(hex) {
	const bigint = parseInt(hex.slice(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
}

export function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

export function roundToNearest(value, multiple) {
	return Math.round(value / multiple) * multiple;
}

export function reduceColorSpace(rgb, multiple = 32) {
	return rgb.map((value) => clamp(roundToNearest(value, multiple), 0, 255));
}

export async function colorFromImage(path) {
	return await ColorThief.getColor(
		path,
		1 // because 96x96 is a small image
	);
}

export const writeFile = (path, data) => {
	fs.writeFileSync(path, data, (err) => {
		if (err) {
			console.error(`Error writing to ${path}`, err);
		} else {
			console.log(`${path} generated successfully`);
		}
	});
};
