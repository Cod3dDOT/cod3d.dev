import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/security.txt",
				"/pgp-key.txt",
				"/pokemon",
				"/img",
				"/pwa",
				"*/opengraph-image",
				"*/download",
			],
		},
		sitemap: "https://cod3d.dev/sitemap.xml",
	};
}
