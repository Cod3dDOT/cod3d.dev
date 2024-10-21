'use client';

import DOMPurify from 'isomorphic-dompurify';

window.trustedTypes?.createPolicy('default', {
	createHTML: (input: string) => {
		let PARSER_MEDIA_TYPE = undefined;
		if (input.startsWith('{"@context":"https://schema.org"')) {
			PARSER_MEDIA_TYPE = 'application/ld+json';
		}
		return DOMPurify.sanitize(input, {
			USE_PROFILES: { html: true },
			PARSER_MEDIA_TYPE: PARSER_MEDIA_TYPE,
			RETURN_TRUSTED_TYPE: false,
			FORCE_BODY: true,
			IN_PLACE: true,
			ADD_TAGS: ['script']
		});
	},
	createScriptURL: (input: string) => {
		const allowed = ['/cf.js', '/um.js'];
		if (!allowed.includes(input)) return '';

		return DOMPurify.sanitize(input, {
			USE_PROFILES: { html: true },
			PARSER_MEDIA_TYPE: 'application/text',
			RETURN_TRUSTED_TYPE: false,
			FORCE_BODY: true
		});
	}
});
