import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const compat = new FlatCompat();

export default [
	includeIgnoreFile(gitignorePath),
	{
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn'
		}
	},
	...fixupConfigRules(compat.extends('plugin:@next/next/core-web-vitals'))
];
