const webpack = require('webpack');
const path = require('path');

/**
 * Webpack Plugins
 *
 * possivel problema com o copy-webpack-plugin
 */
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // Mapa de erros!
    devtool: 'source-map',
    // devtool: 'cheap-module-source-map',

    // Entrada de arquivos
    entry: {
        'polyfills': './src/polyfills',
        'main': './src/main'
    },

    // Resolves
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ],
    },

    // Module configure
    module: {
        rules: [{
                test: /\.ts$/,
                use: [{
                        loader: '@angularclass/hmr-loader',
                    },
                    {
                        loader: 'ng-router-loader',
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.webpack.json',
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'src/styles'),
                ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                }),
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'src/styles'),
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: [path.resolve(__dirname, 'src/index.html')]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader'
            }
        ],
    },

    // Plugins
    plugins: [
        new CheckerPlugin(),

        // Create a index.html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            title: 'Project',
            inject: 'body'
        }),

        // Create css file and inject in index.html
        new ExtractTextPlugin('[name].css'),

        // Arquivos comuns
        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),

        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, 'src')
        ),

        // Copy assest to public folder
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'dist/assets')
        }, ]),

        // Uglyfi
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        })
    ],

    // Saida de arquivos
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].chunk.js',
        library: 'ac_[name]',
        libraryTarget: 'var',
    },

    // Server-DEV
    devServer: {
        inline: true,
        port: 420,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/
        },
        setup: function (app) {}
    }
}
