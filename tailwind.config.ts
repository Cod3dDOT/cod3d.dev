import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		screens: {
			xs: '400px',
			...defaultTheme.screens
		},
		extend: {
			fontFamily: {
				pixelify: ['var(--font-pixelify)'],
				roboto: ['var(--font-roboto)']
			},
			colors: {
				transparent: 'transparent',
				foreground: 'var(--foreground)',
				background: 'var(--background)'
			},
			animation: {
				arrows: 'arrows 2s infinite'
			},
			keyframes: {
				arrows: {
					'0%': { translate: '-5px 0', opacity: '0' },
					'30%': { translate: '0', opacity: '1' },
					'60%': { translate: '0', opacity: '1' },
					'100%': { translate: '5px 0', opacity: '0' }
				}
			}
		}
	},
	plugins: [
		require('@pyncz/tailwind-mask-image'),
		require('@tailwindcss/typography'),
		require('tailwindcss-animate')
	]
};
export default config;
