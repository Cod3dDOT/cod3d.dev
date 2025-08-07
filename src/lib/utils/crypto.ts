/*
 * SPDX-FileCopyrightText: 2025 cod3ddot@proton.me
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function stringToUniqueId(str: string, seed = 0) {
	let h1 = 0xdeadbeef ^ seed;
	let h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch: number; i < str.length; i++) {
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

/**
 * Generates a random 32-bit integer using the splitmix32 algorithm.
 *
 * @param {number} a - seed
 * @return {number} a random 32-bit integer between 0 and 1.
 */
export function splitmix32(a: number = Date.now() * Math.random()): number {
	a |= 0;
	a = (a + 0x9e3779b9) | 0;
	let t = a ^ (a >>> 16);
	t = Math.imul(t, 0x21f0aaad);
	t = t ^ (t >>> 15);
	t = Math.imul(t, 0x735a2d97);
	// biome-ignore lint/suspicious/noAssignInExpressions: this is black magic, don't touch
	return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
}

// async function deriveKeyFromPassword(
// 	password: string,
// 	salt: Uint8Array
// ): Promise<CryptoKey> {
// 	const enc = new TextEncoder();
// 	const passKey = await crypto.subtle.importKey(
// 		"raw",
// 		enc.encode(password),
// 		{ name: "PBKDF2" },
// 		false,
// 		["deriveKey"]
// 	);
// 	return crypto.subtle.deriveKey(
// 		{
// 			name: "PBKDF2",
// 			salt,
// 			iterations: 100_000,
// 			hash: "SHA-256"
// 		},
// 		passKey,
// 		{ name: "AES-GCM", length: 256 },
// 		false,
// 		["encrypt", "decrypt"]
// 	);
// }

// /**
//  * Encrypt plaintext with a password-derived key using AES-GCM.
//  * Returns opaque token: salt.iv.ciphertext (all base64).
//  */
// export async function encryptPayload(
// 	plaintext: string,
// 	password: string
// ): Promise<string> {
// 	// 128-bit salt for PBKDF2
// 	const salt = crypto.getRandomValues(new Uint8Array(16));
// 	const key = await deriveKeyFromPassword(password, salt);

// 	// 96-bit IV for AES-GCM
// 	const iv = crypto.getRandomValues(new Uint8Array(12));
// 	const cipherBuffer = await crypto.subtle.encrypt(
// 		{ name: "AES-GCM", iv },
// 		key,
// 		new TextEncoder().encode(plaintext)
// 	);

// 	const saltB64 = Buffer.from(salt).toString("base64");
// 	const ivB64 = Buffer.from(iv).toString("base64");
// 	const ctB64 = Buffer.from(new Uint8Array(cipherBuffer)).toString("base64");
// 	return `${saltB64}.${ivB64}.${ctB64}`;
// }

// /**
//  * Decrypt opaque token produced by encryptPayload using the same password.
//  */
// export async function decryptPayload(
// 	token: string,
// 	password: string
// ): Promise<string> {
// 	const [saltB64, ivB64, ctB64] = token.split(".");
// 	if (!saltB64 || !ivB64 || !ctB64) throw new Error("Invalid token format");

// 	const salt = Uint8Array.from(Buffer.from(saltB64, "base64"));
// 	const iv = Uint8Array.from(Buffer.from(ivB64, "base64"));
// 	const ct = Buffer.from(ctB64, "base64");

// 	const key = await deriveKeyFromPassword(password, salt);
// 	const plainBuffer = await crypto.subtle.decrypt(
// 		{ name: "AES-GCM", iv },
// 		key,
// 		ct
// 	);
// 	return new TextDecoder().decode(plainBuffer);
// }
