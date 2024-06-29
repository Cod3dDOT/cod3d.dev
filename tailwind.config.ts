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
				sans: ['var(--font-geist-sans)'],
				mono: ['var(--font-geist-mono)']
			},
			colors: {
				transparent: 'transparent',
				foreground: 'rgb(var(--foreground) / <alpha-value>)',
				background: 'rgb(var(--background) / <alpha-value>)',
				'background-dark': 'rgb(var(--background-dark) / <alpha-value>)'
			},
			animation: {
				arrows: 'arrows 2s infinite',
				'link-hover': 'link 1s forwards',
				'link-default': 'link 1s backwards'
			},
			keyframes: {
				arrows: {
					'0%': { translate: '-5px 0', opacity: '0' },
					'30%': { translate: '0', opacity: '1' },
					'60%': { translate: '0', opacity: '1' },
					'100%': { translate: '5px 0', opacity: '0' }
				},
				link: {
					'0%': { width: '0', height: '2px' },
					'50%': { width: '100%', height: '2px' },
					'100%': { width: '100%', height: '100%' }
				}
			}
		}
	},
	plugins: [
		require('@pyncz/tailwind-mask-image'),
		require('@tailwindcss/typography'),
		require('tailwindcss-animate'),
		require('tailwind-scrollbar')
	]
};
export default config;
