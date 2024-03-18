import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'cod3d.dev',
		short_name: 'cod3d.dev',
		description: 'Probably trying to hack you. Or sleeping. Or both.',
		start_url: '/',
		lang: 'en_US',
		display: 'standalone',
		background_color: '#111111',
		theme_color: '#111111',
		icons: [
			{
				src: '/icons/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/icons/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			},
			{
				src: '/favicon.ico',
				sizes: '48x48 32x32 16x16',
				type: 'image/x-icon'
			}
		]
		// shortcuts: [
		// 	{
		// 		name: 'Projects',
		// 		url: '/projects'
		// 	},
		// 	{
		// 		name: 'Blog',
		// 		url: '/blog'
		// 	}
		// ]
	};
}
