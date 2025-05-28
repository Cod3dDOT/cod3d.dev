/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Fetches an image from URL and encodes it into a base64 string
 * Adapted from this thread: https://community.cloudflare.com/t/convert-request-body-to-base64-encoded-string-solved/99341/5
 * @param {string} url
 * @returns {Promise<string>}
 */
export async function imageToData(url: string): Promise<string> {
	const response = await fetch(url);
	const contentType = response.headers.get("content-type") || "image/png";
	const buffer = new Uint8Array(await response.arrayBuffer());

	return bufferToData(contentType, buffer);
}

export async function bufferToData(
	contentType: string,
	buffer: Buffer | Uint8Array
): Promise<string> {
	let string = "";
	for (let i = 0; i < buffer.byteLength; i++) {
		string += String.fromCharCode(buffer[i]);
	}

	const base64 = btoa(string);
	return `data:${contentType};base64,${base64}`;
}
