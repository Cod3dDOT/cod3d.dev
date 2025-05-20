/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from "node:fs";

export const writeFile = (path: string, data: string | Buffer): void => {
	try {
		fs.writeFileSync(path, data);
	} catch (error) {
		console.error(error);
	}
};

export const removeFile = (path: string): void => {
	try {
		fs.unlinkSync(path);
	} catch (error) {
		console.error(error);
	}
};

export const removeFolder = (path: string): void => {
	try {
		fs.rmdirSync(path, { recursive: true });
	} catch (error) {
		console.error(error);
	}
};

export const createFolder = (path: string): void => {
	try {
		if (fs.existsSync(path)) return;
		fs.mkdirSync(path);
	} catch (error) {
		console.error(error);
	}
};
