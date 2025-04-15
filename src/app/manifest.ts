import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "cod3d.dev",
		short_name: "cod3d.dev",
		description: "Probably trying to hack you. Or sleeping. Or both.",
		start_url: "/",
		lang: "en",
		display: "standalone",
		background_color: "#111111",
		theme_color: "#111111",
		icons: [
			{
				src: "/pwa/icons/maskable-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable"
			},
			{
				src: "/pwa/icons/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png"
			},
			{
				src: "/pwa/icons/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png"
			},
			{
				src: "/favicon.ico",
				sizes: "48x48 32x32 16x16",
				type: "image/x-icon"
			}
		],
		screenshots: [
			{
				src: "/pwa/screenshots/mobile.png",
				sizes: "363x811",
				type: "image/png",
				form_factor: "narrow",
				label: "cod3d.dev"
			},
			{
				src: "/pwa/screenshots/desktop.png",
				sizes: "1647x923",
				type: "image/png",
				form_factor: "wide",
				label: "cod3d.dev"
			}
		],
		shortcuts: [
			{
				name: "Projects",
				url: "/projects"
			},
			{
				name: "Thoughts",
				url: "/thoughts"
			}
		]
	};
}
