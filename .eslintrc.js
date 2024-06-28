module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
		jest: true,
	},
	parserOptions: { ecmaVersion: 8, sourceType: 'module' },
	ignorePatterns: [
    'node_modules/*',
    'src/styles'
	],
  extends: ['react-app'],
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			parser: '@typescript-eslint/parser',
			settings: { react: { version: 'detect' } },
			env: {
				browser: true,
				node: true,
				es6: true,
			},
			extends: [],
			rules: {
				'react/no-unescaped-entities': 0,
				'react/prop-types': 'off',
				'react/react-in-jsx-scope': 'off',
				'jsx-a11y/no-onchange': 'off',
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
		},
	],
};
