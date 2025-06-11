const path = require('path');

module.exports = [
	{
		// TODO: Better result of minification: https://minify-js.com/ (ecma2016, module)
		entry: './src/tulur.jsRouter.mjs',
		output: {
			filename: 'tulur.jsRouter.min.mjs',
			path: path.resolve(__dirname, 'publish'),
			library: {
				type: 'module',
			},
			clean: true,
		},
		experiments: {
			outputModule: true,
		},
	},
];