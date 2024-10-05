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
			print: { raw: 'print' },
			xs: '400px',
			...defaultTheme.screens
		},
		extend: {
			transitionProperty: {
				cursor: 'color,background-color,transform,width,height,opacity'
			},
			fontFamily: {
				pixelify: ['var(--font-pixelify)'],
				sans: ['var(--font-geist-sans)'],
				mono: ['var(--font-geist-mono)']
			},
			colors: {
				transparent: 'transparent',
				foreground: 'rgb(var(--foreground) / <alpha-value>)',
				background: 'rgb(var(--background) / <alpha-value>)',
				'background-dark': 'rgb(var(--background-dark) / <alpha-value>)',
				accent: 'rgb(var(--accent) / <alpha-value>)'
			},
			animation: {
				arrows: 'arrows 2s infinite',
				'blog-in': 'blog-in 1s forwards'
			},
			keyframes: {
				arrows: {
					'0%': { transform: 'translateX(-5px)', opacity: '0' },
					'30%': { transform: 'translateX(0)', opacity: '1' },
					'60%': { transform: 'translateX(0)', opacity: '1' },
					'100%': { transform: 'translateX(5px)', opacity: '0' }
				},
				'blog-in': {
					'0%': { opacity: '0', transform: 'translateY(-5px)' },
					'100%': { opacity: '1' }
				}
			},
			transitionTimingFunction: {
				'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)'
			},
			transitionDuration: {
				'2000': '2000ms'
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
