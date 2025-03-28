import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';


const config = (env) => {
	return {
		devServer: {
			watchFiles: ['src/*'],
		},

		devtool: 'source-map',

		entry: {
			'3d-tiles': './src/entries/3d-tiles.js',
			'3d-tiles-context': './src/entries/3d-tiles-context.js',
		},

		module: {
			rules: [
				{
					test: /src.*\.ts(x)?$/,
					use: 'ts-loader',
				},
			],
		},

		output: {
			clean: true,
			filename: '[name].js',
			path: path.resolve(__dirname, 'public/assets/js'),
			publicPath: '/assets/js/',
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

