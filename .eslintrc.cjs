/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	ignorePatterns: [
		'node_modules/*',
		'.husky/*',
		'.storybook/*',
		'!**/.server',
		'!**/.client',
	],

	// Base config
	extends: ['eslint:recommended'],

	overrides: [
		// React
		{
			files: ['**/*.{js,jsx,ts,tsx}'],
			plugins: ['react', 'jsx-a11y'],
			extends: [
				'plugin:react/recommended',
				'plugin:react/jsx-runtime',
				'plugin:react-hooks/recommended',
				'plugin:jsx-a11y/recommended',
			],
			rules: {
				'react/no-unescaped-entities': 0,
				'react/prop-types': 'off', // ts types used instead
				'react/react-in-jsx-scope': 'off', // no need to import React when using next
				'jsx-a11y/no-onchange': 'off', // this is only relevant below ie11
				'@typescript-eslint/no-namespace': ['warn'],
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/no-unused-vars': ['warn'],
				'@typescript-eslint/no-explicit-any': ['warn'],
				'@typescript-eslint/explicit-function-return-type': [
					'warn',
					{
						allowExpressions: true,
						allowConciseArrowFunctionExpressionsStartingWithVoid: true,
					},
				],
				'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
			},
			settings: {
				react: {
					version: 'detect',
				},
				formComponents: ['Form'],
				linkComponents: [
					{ name: 'Link', linkAttribute: 'to' },
					{ name: 'NavLink', linkAttribute: 'to' },
				],
				'import/resolver': {
					typescript: {},
				},
			},
		},

		// Typescript
		{
			files: ['**/*.{ts,tsx}'],
			plugins: ['@typescript-eslint', 'import'],
			parser: '@typescript-eslint/parser',
			settings: {
				'import/internal-regex': '^~/',
				'import/resolver': {
					node: {
						extensions: ['.ts', '.tsx'],
					},
					typescript: {
						alwaysTryTypes: true,
					},
				},
			},
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:import/recommended',
				'plugin:import/typescript',
			],
		},

		// Node
		{
			files: ['.eslintrc.cjs', 'server.js'],
			env: {
				node: true,
			},
		},
	],
};
