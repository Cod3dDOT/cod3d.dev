/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { splitmix32 } from "./crypto";

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

export const lerp = (start: number, end: number, factor: number) => {
	return start + (end - start) * factor;
};
