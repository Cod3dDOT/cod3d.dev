import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/_next', '/security.txt', '/*opengraph-image']
		},
		sitemap: 'https://cod3d.dev/sitemap.xml'
	};
}
