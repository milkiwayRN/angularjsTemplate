const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const BrowserPlugin = require('webpack-browser-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const chromeUserDataDir = '~/chrome-data';

module.exports = env => {
    let buildDir = './dist';
    if (env && env.output) {
        buildDir = env.output;
    }
    const buildPath = path.resolve(__dirname, buildDir);

    const config = {
        entry: './app/index.js',
        output: {
            filename: 'bundle.js',
            path: buildPath,
            library: 'index',
            publicPath: '/',
        },

        watchOptions: {
            poll: true,
            ignored: /node_modules/,
        },

        plugins: [
            new CleanWebpackPlugin('*', { root: buildPath }),
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: 'index.html',
                inject: 'body',
            }),
            new ExtractTextPlugin('styles.css'),
            new webpack.HotModuleReplacementPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ExtractTextPlugin.extract({
                        fallback: { loader: 'style-loader' },
                        use: [
                            {
                                loader: 'css-loader',
                            },
                        ],
                    }),
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'less-loader',
                                query: {
                                    sourceMap: false,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(jpe?g|png|svg|gif|woff|woff2|eot|ttf)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        outputPath: 'assets/',
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.json', '.css'],
        },
        devServer: {
            contentBase: buildDir,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT,

            headers: {
                'Access-Control-Allow-Origin': '*',
            },

        },
    };

    const envOptions = {
        DEBUG: false,
        host: 'localhost',
        port: 8080,
        NODE_ENV: 'development',
    };

    if (env && env.production) {
        config.plugins.push(new UglifyJSPlugin({
            sourceMap: true,
        }));
        envOptions.NODE_ENV = 'production';
        config.devtool = 'source-map';
    }

    config.plugins.push(new webpack.EnvironmentPlugin(envOptions));

    return config;
};
