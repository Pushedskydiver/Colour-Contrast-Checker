module.exports = {
	plugins: {
		'postcss-preset-env': {
			autoprefixer: {
				flexbox: 'no-2009',
			},
			browsers: 'last 3 versions',
			stage: 3,
			features: {
				'custom-properties': false,
				'nesting-rules': true,
			},
		},
		'postcss-sort-media-queries': {
			sort: function (a, b) {
				return b - a;
			},
		},
	},
};
