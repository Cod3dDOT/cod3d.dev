import { middlewareFunctionReturn } from '.';

const IS_DEV = process.env.NODE_ENV === 'development';

const CSP_BASE = {
	'default-src': "'self'",
	'connect-src': "'self'",
	'script-src': "'self' 'strict-dynamic'",
	'style-src': "'self' 'unsafe-hashes'",
	'img-src': "'self' blob: data:",
	'font-src': "'self'",
	'object-src': "'none'",
	'base-uri': "'self'",
	'form-action': "'self'",
	'frame-ancestors': "'none'",
	'upgrade-insecure-requests': '',
	'require-trusted-types-for': ''
};

const CSP_HASHES = {
	script: [
		"'sha256-eMuh8xiwcX72rRYNAGENurQBAcH7kLlAUQcoOri3BIo='", // json-ld inline script
		"'sha256-6lqB9Ygbzi0wO4IM0J1KCpaYEpW1FhaT5YlCocflnyg='" // umami analytics
	],
	style: [
		// thoughts
		"'sha256-OXJWNkqOzUVYLtMkGQ9uevLQsgCZb/Y+Q6ypWpD5ai8='",
		"'sha256-3EP1piOo/O4YWqWO7mQYW6fCsMcX8uB/C/w3Cgomac4='",
		"'sha256-DfDHsb01i3x8hjBF8augn/uMacvjKKf6ZvynOJD7J8o='",
		"'sha256-geco2bDyS+Sc/wAKeVY5bwJ5ZiB4SsxkbgG2GqlY468='",
		"'sha256-Y9g1vnU5ywyIwbIvwb3UvTiA2lo4N5nIBXfiMNClqYQ='",

		// homepage
		"'sha256-zlqnbDt84zf1iSefLU/ImC54isoprH/MRiVZGskwexk='",
		"'sha256-tTgjrFAQDNcRW/9ebtwfDewCTgZMFnKpGa9tcHFyvcs='",

		//hello
		"'sha256-HGYbL7c7YTMNrtcUQBvASpkCpnhcLdlW/2pKHJ8sJ98='",
		"'sha256-YYxElkDlCygmA+y95zmjQUGyfjKfYNAlVBuOlwC16mU='",
		"'sha256-sf+AfSpoX2wAlbPSwhwe8fvuXnxOevh3pN6J2u1XdVE='"
	]
};

const GENERATE_CSP_NONCE = () =>
	Buffer.from(crypto.randomUUID()).toString('base64');

const ADD_NONCE = (header: string, nonce: string) => {
	return `${header} 'nonce-${nonce}'`;
};

const ADD_HASHES = (header: string, hashes: string[]) => {
	return `${header} ${hashes.join(' ')}`;
};

// I will probably never get rid of "unsafe-hashes"
// Am I mad about it? Yes. Yes I am.
// Can I do anything about it? Probably not, as it will require removing all inline styles.
export function CSP(
	requestHeaders: Headers,
	responseHeaders: Headers
): middlewareFunctionReturn {
	const nonce = GENERATE_CSP_NONCE();

	let scriptSrc = IS_DEV ? "'unsafe-eval'" : '';
	scriptSrc = ADD_HASHES(scriptSrc, CSP_HASHES.script);
	scriptSrc = ADD_NONCE(scriptSrc, nonce);

	let styleSrc = '';
	if (IS_DEV) {
		styleSrc = "'unsafe-inline'";
	} else {
		styleSrc = ADD_HASHES(styleSrc, CSP_HASHES.style);
		styleSrc = ADD_NONCE(styleSrc, nonce);
	}

	const trustedScript = IS_DEV ? '' : "'script'";

	const cspDict = { ...CSP_BASE };
	cspDict['script-src'] += ' ' + scriptSrc;
	cspDict['style-src'] += ' ' + styleSrc;
	cspDict['require-trusted-types-for'] = trustedScript;

	const cspHeader = Object.entries(cspDict)
		.map(([key, value]) => `${key} ${value}`)
		.join('; ');

	// Replace newline characters and spaces
	const cspHeaderSafe = cspHeader.replace(/\s{2,}/g, ' ').trim();

	requestHeaders.set('x-nonce', nonce);
	requestHeaders.set('Content-Security-Policy', cspHeaderSafe);

	responseHeaders.set('Content-Security-Policy', cspHeaderSafe);

	return {
		requestHeaders,
		responseHeaders
	};
}
