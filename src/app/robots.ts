import { MetadataRoute } from 'next';

import { HOST } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: [
				'/security.txt',
				'/pgp-key.txt',
				'/pokemon',
				'/img',
				'/pwa',
				'*/opengraph-image'
			]
		},
		sitemap: HOST + '/sitemap.xml'
	};
}
