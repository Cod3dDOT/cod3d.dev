// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
// import nextPlugin from '@next/eslint-plugin-next';
// @ts-expect-error eslint-plugin-import is not typed
import importPlugin from 'eslint-plugin-import';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import ts from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const typeScriptConfig = [
	...ts.configs.strictTypeChecked,
	{
		plugins: {
			'@typescript-eslint': ts.plugin
		},
		languageOptions: {
			parser: ts.parser,
			parserOptions: {
				project: true
			}
		}
	},
	{
		// disable type-aware linting on JS files
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		...ts.configs.disableTypeChecked
	}
];

// const nextConfig = {
// 	plugins: {
// 		'@next/next': nextPlugin
// 	},
// 	rules: {
// 		...nextPlugin.configs.recommended.rules,
// 		...nextPlugin.configs['core-web-vitals'].rules
// 	}
// };

const importSortConfig = {
	plugins: {
		'simple-import-sort': simpleImportSort,
		import: importPlugin
	},
	rules: {
		// imports
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',

		'@typescript-eslint/no-require-imports': [
			'error',
			{
				allow: ['@pyncz/tailwind-mask-image']
			}
		]
	}
};

const config = [
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...typeScriptConfig,
	// nextConfig,
	importSortConfig,
	prettierConfigRecommended, // must come last
	{
		ignores: ['./husky'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	}
];

export default config;
