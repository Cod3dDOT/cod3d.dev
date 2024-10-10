// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import ts from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

const patchedConfig = fixupConfigRules([
	...compat.extends('plugin:@next/next/recommended')
]);

const config = [
	includeIgnoreFile(gitignorePath),
	...patchedConfig,
	...ts.configs.recommended,
	prettierConfigRecommended, // must come last
	{
		ignores: ['.next/'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',

			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
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
	}
];

export default config;
