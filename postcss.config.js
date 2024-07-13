export default {
	plugins: {
		'postcss-preset-env': {
			autoprefixer: {
				flexbox: false,
			},
			browsers: 'last 2 versions',
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
