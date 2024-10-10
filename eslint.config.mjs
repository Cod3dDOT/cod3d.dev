// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, includeIgnoreFile } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
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
	...compat.extends('next/core-web-vitals')
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
			'simple-import-sort': simpleImportSort
			// 	import: importPlugin
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
			],

			// accessibility
			'jsx-a11y/alt-text': 'error',
			'jsx-a11y/anchor-ambiguous-text': 'off',
			'jsx-a11y/anchor-has-content': 'error',
			'jsx-a11y/anchor-is-valid': 'error',
			'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
			'jsx-a11y/aria-props': 'error',
			'jsx-a11y/aria-proptypes': 'error',
			'jsx-a11y/aria-role': 'error',
			'jsx-a11y/aria-unsupported-elements': 'error',
			'jsx-a11y/autocomplete-valid': 'error',
			'jsx-a11y/click-events-have-key-events': 'error',
			'jsx-a11y/control-has-associated-label': [
				'off',
				{
					ignoreElements: [
						'audio',
						'canvas',
						'embed',
						'input',
						'textarea',
						'tr',
						'video'
					],
					ignoreRoles: [
						'grid',
						'listbox',
						'menu',
						'menubar',
						'radiogroup',
						'row',
						'tablist',
						'toolbar',
						'tree',
						'treegrid'
					],
					includeRoles: ['alert', 'dialog']
				}
			],
			'jsx-a11y/heading-has-content': 'error',
			'jsx-a11y/html-has-lang': 'error',
			'jsx-a11y/iframe-has-title': 'error',
			'jsx-a11y/img-redundant-alt': 'error',
			'jsx-a11y/interactive-supports-focus': [
				'error',
				{
					tabbable: [
						'button',
						'checkbox',
						'link',
						'searchbox',
						'spinbutton',
						'switch',
						'textbox'
					]
				}
			],
			'jsx-a11y/label-has-associated-control': 'error',
			'jsx-a11y/label-has-for': 'off',
			'jsx-a11y/media-has-caption': 'error',
			'jsx-a11y/mouse-events-have-key-events': 'error',
			'jsx-a11y/no-access-key': 'error',
			'jsx-a11y/no-autofocus': 'error',
			'jsx-a11y/no-distracting-elements': 'error',
			'jsx-a11y/no-interactive-element-to-noninteractive-role': [
				'error',
				{
					tr: ['none', 'presentation'],
					canvas: ['img']
				}
			],
			'jsx-a11y/no-noninteractive-element-interactions': [
				'error',
				{
					handlers: [
						'onClick',
						'onError',
						'onLoad',
						'onMouseDown',
						'onMouseUp',
						'onKeyPress',
						'onKeyDown',
						'onKeyUp'
					],
					alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
					body: ['onError', 'onLoad'],
					dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
					iframe: ['onError', 'onLoad'],
					img: ['onError', 'onLoad']
				}
			],
			'jsx-a11y/no-noninteractive-element-to-interactive-role': [
				'error',
				{
					ul: [
						'listbox',
						'menu',
						'menubar',
						'radiogroup',
						'tablist',
						'tree',
						'treegrid'
					],
					ol: [
						'listbox',
						'menu',
						'menubar',
						'radiogroup',
						'tablist',
						'tree',
						'treegrid'
					],
					li: [
						'menuitem',
						'menuitemradio',
						'menuitemcheckbox',
						'option',
						'row',
						'tab',
						'treeitem'
					],
					table: ['grid'],
					td: ['gridcell'],
					fieldset: ['radiogroup', 'presentation']
				}
			],
			'jsx-a11y/no-noninteractive-tabindex': [
				'error',
				{
					tags: [],
					roles: ['tabpanel'],
					allowExpressionValues: true
				}
			],
			'jsx-a11y/no-redundant-roles': 'error',
			'jsx-a11y/no-static-element-interactions': [
				'error',
				{
					allowExpressionValues: true,
					handlers: [
						'onClick',
						'onMouseDown',
						'onMouseUp',
						'onKeyPress',
						'onKeyDown',
						'onKeyUp'
					]
				}
			],
			'jsx-a11y/role-has-required-aria-props': 'error',
			'jsx-a11y/role-supports-aria-props': 'error',
			'jsx-a11y/scope': 'error',
			'jsx-a11y/tabindex-no-positive': 'error'
		}
	}
];

export default config;
