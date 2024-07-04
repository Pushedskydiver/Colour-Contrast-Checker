module.exports = {
	extends: ['stylelint-config-standard'],
	plugins: ['stylelint-order', 'stylelint-use-logical'],
	rules: {
		'selector-class-pattern': null,
		'no-descending-specificity': null,
		'color-no-invalid-hex': true,
		'declaration-no-important': true,
		'max-nesting-depth': 4,
		'length-zero-no-unit': true,
		'declaration-block-no-duplicate-properties': true,
		'declaration-block-no-redundant-longhand-properties': true,
		'declaration-block-no-shorthand-property-overrides': true,
		'block-no-empty': true,
		'no-duplicate-selectors': true,
		'csstools/use-logical': true,
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['value', 'define-mixin', 'mixin'],
			},
		],
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['composes', 'composes-with'],
			},
		],
		'function-no-unknown': [
			true,
			{
				ignoreFunctions: ['strip'],
			},
		],
	},
	ignoreFiles: ['app/styles/*.css', 'build/**/*.css'],
};
