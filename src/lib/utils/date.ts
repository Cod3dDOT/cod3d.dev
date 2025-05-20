/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const dateToString = (date: Date) => {
	return date.toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
};

export const minutesToDuration = (mins: number): string => {
	const days = Math.floor(mins / 1440);
	const hours = Math.floor((mins % 1440) / 60);
	const minutes = mins % 60;

	const daysStr = days ? `${days.toString()}D ` : "";
	const hoursStr = hours ? `${hours.toString()}H ` : "";
	const minutesStr = `${minutes.toString()}M`;

	return `PT${daysStr}${hoursStr}${minutesStr}`;
};
