const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './index.mjs',
	output: {
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		port: 3000,
		open: true,
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],
};