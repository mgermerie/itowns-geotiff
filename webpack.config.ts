import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';


const config = (env) => {
	return {
		devServer: {
			watchFiles: ['src/*'],
		},

		devtool: 'source-map',

		entry: './src/index.ts',

		module: {
			rules: [
				{
					test: /src.*\.ts(x)?$/,
					use: 'ts-loader',
				},
				{
					test: /src.*\.html$/i,
					use: 'html-loader',
				},
				{
					test: /src.*\.css$/i,
					use: [
						{
							loader: 'style-loader',
							options: { injectType: 'linkTag' },
						},
						{
							loader: 'file-loader',
						},
					],
				},
			],
		},

		output: {
			clean: true,
			filename: 'main.js',
			path: path.resolve(__dirname, 'public/js'),
			publicPath: '/js/',
		},

		resolve: {
			extensions: ['.ts', '.js'],
			fallback: {
				'fs': false,
				'http': false,
				'https': false,
				'url': false,
			},
		},
	};
}


export default config;

