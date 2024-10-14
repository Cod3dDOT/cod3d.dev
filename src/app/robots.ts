import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/_next/images', '/security.txt', '/*opengraph-image']
		},
		sitemap: 'https://cod3d.dev/sitemap.xml'
	};
}
