'use client';

import DOMPurify from 'dompurify';

window.trustedTypes?.createPolicy('default', {
	createHTML: (input: string) => {
		return DOMPurify.sanitize(input, {
			USE_PROFILES: { html: true },
			PARSER_MEDIA_TYPE: 'application/ld+json',
			RETURN_TRUSTED_TYPE: false,
			FORCE_BODY: true,
			IN_PLACE: true,
			ADD_TAGS: ['script']
		});
	}
});
