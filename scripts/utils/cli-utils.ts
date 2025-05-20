/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function updateProgressBar(current: number, total: number): void {
	const barLength = 40; // Length of the progress bar in characters
	const progress = Math.floor((current / total) * barLength);
	const bar = "█".repeat(progress) + "░".repeat(barLength - progress);
	const percentage = ((current / total) * 100).toFixed(2);

	// Clear the current line and print the progress bar
	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	process.stdout.write(
		`Progress: [${bar}] ${percentage}% (${current}/${total})`
	);
}
