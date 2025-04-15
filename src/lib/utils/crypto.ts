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
	// biome-ignore lint/style/noParameterAssign: <explanation>
	a |= 0;
	// biome-ignore lint/style/noParameterAssign: <explanation>
	a = (a + 0x9e3779b9) | 0;
	let t = a ^ (a >>> 16);
	t = Math.imul(t, 0x21f0aaad);
	t = t ^ (t >>> 15);
	t = Math.imul(t, 0x735a2d97);
	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
}

export async function signToken(data: string, SECRET: Uint8Array) {
	const key = await crypto.subtle.importKey(
		"raw",
		SECRET,
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"]
	);

	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		new TextEncoder().encode(data)
	);

	// Convert the ArrayBuffer to a hex string
	return Array.from(new Uint8Array(signature))
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

// Helper to verify the token's signature
export async function verifyToken(
	data: string,
	signature: string,
	SECRET: Uint8Array
) {
	const key = await crypto.subtle.importKey(
		"raw",
		SECRET,
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["verify"]
	);

	const expectedSignature = new Uint8Array(
		signature.match(/.{1,2}/g)?.map((byte) => Number.parseInt(byte, 16)) || []
	);

	return await crypto.subtle.verify(
		"HMAC",
		key,
		expectedSignature,
		new TextEncoder().encode(data)
	);
}

export async function generateCspHash(input: string) {
	// Hash the data using SHA-256
	const hashBuffer = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(input)
	);

	const base64Hash = Buffer.from(hashBuffer).toString("base64");

	return `sha256-${base64Hash}`;
}
