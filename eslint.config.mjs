import globals from 'globals';
import { fixupConfigRules } from '@eslint/compat';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: [
			'node_modules/*',
			'build/*',
			'public/*',
			'.husky/*',
			'!**/.server',
			'!**/.client',
		],
	},
	...compat.extends('eslint:recommended'),
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},

			ecmaVersion: 8,
			sourceType: 'module',
		},
	},
	...fixupConfigRules(
		compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/recommended',
			'plugin:react/recommended',
			'plugin:react-hooks/recommended',
			'plugin:jsx-a11y/recommended',
		),
	).map((config) => ({
		...config,
		files: ['**/*.ts', '**/*.tsx'],
	})),
	{
		files: ['**/*.ts', '**/*.tsx'],

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},

			parser: tsParser,
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			'react/no-unescaped-entities': 0,
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'jsx-a11y/no-onchange': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-unused-vars': ['warn'],

			'@typescript-eslint/explicit-function-return-type': [
				'warn',
				{
					allowExpressions: true,
					allowConciseArrowFunctionExpressionsStartingWithVoid: true,
				},
			],

			'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
			'@typescript-eslint/no-namespace': 'off',
			'react/display-name': 'off',
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
];
