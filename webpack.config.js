const HtmlWebPackPlugin = require( 'html-webpack-plugin' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const autoprefixer = require( 'autoprefixer' );

const dev = process.env.NODE_ENV !== 'production' ? true : false;

const env = dev ? 'development' : 'production';

module.exports = async () => {

	return {

		target: 'web',
		mode: env,
		devtool: dev ? 'eval-source-map' : 'none',
		watch: dev,
		module: {
			rules: [
				{
					test: /\.html$/,
					use: [
						'html-loader'
					]
				}, {
					test: /\.scss$/,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								plugins: loader => [autoprefixer]
							}
						},
						'sass-loader'
					]
				}, {
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				}, {
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							babelrc: true
						}
					}
				}, {
					test: /\.(otf|ttf|eot|woff|woff2|svg)$/,
					include: /src\/assets\/fonts/,
					exclude: /src\/assets\/icons/,
					use: {
						loader: 'file-loader',
						options: {
							name: 'assets/fonts/[name].[ext]'
						}
					}
				}, {
					test: /\.(otf|ttf|eot|woff|woff2|svg)$/,
					include: /src\/assets\/icons/,
					exclude: /src\/assets\/fonts/,
					use: {
						loader: 'file-loader',
						options: {
							name: 'assets/icons/[name].[ext]'
						}
					}
				}, {
					test: /\.(svg|jpg|png|gif)$/,
					include: /src\/assets\/images/,
					exclude: /(src\/assets\/fonts|src\/assets\/icons)/,
					use: {
						loader: 'file-loader',
						options: {
							name: 'assets/images/[name].[ext]'
						}
					}
				}, {
					test: /\.(mov|mp4)$/,
					include: /src\/assets\/videos/,
					use: {
						loader: 'file-loader',
						options: {
							name: 'assets/videos/[name].[ext]'
						}
					}
				}
			]
		},
		plugins: [
			new HtmlWebPackPlugin({
				template: './src/index.html',
				filename: './index.html'
			}),
			new MiniCssExtractPlugin()
		]

	};

};