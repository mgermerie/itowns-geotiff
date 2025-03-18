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
			'mnx-hypsometric': './src/entries/mnx-hypsometric.ts',
			'ortho-mnx': './src/entries/ortho-mnx.ts',
			'3d-tiles': './src/entries/3d-tiles.ts',
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

