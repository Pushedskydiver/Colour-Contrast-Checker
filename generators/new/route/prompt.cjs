module.exports = [
	{
		type: 'input',
		name: 'filename',
		message: 'Filename (without .tsx):',
		validate(value) {
			if (!value.length) {
				return 'Routes must have a filename.';
			}
			return true;
		},
	},
	{
		type: 'input',
		name: 'name',
		message: 'Route name:',
		validate(value) {
			if (!value.length) {
				return 'Routes must have a named export.';
			}
			return true;
		},
	},
];
