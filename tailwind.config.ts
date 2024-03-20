import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
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
	plugins: [require('tailwindcss-animate')]
};
export default config;
