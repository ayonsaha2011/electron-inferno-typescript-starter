const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const transformInferno = require('ts-transform-inferno').default
const transformClasscat = require('ts-transform-classcat').default


const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

module.exports = (env, argv) => {
    return {
        target: 'electron-renderer',
        devtool: isEnvDevelopment ? 'source-map' : false,
        mode: isEnvProduction ? 'production' : 'development',
        context: path.resolve(__dirname, './renderer-src'),
        node: { __dirname: true, __filename: true },
        entry: {
            app: './app.tsx'
        },

        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        devtool: 'source-map',

        resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },

        module: {
            rules: [
                { 
                    test: /\.(ts|tsx)$/, 
                    loader: 'ts-loader', 
                    options: { 
                        transpileOnly: true,
                        configFile: "renderer.tsconfig.json",
                        getCustomTransformers: () => ({
                            before: [transformClasscat(), transformInferno()],
                        })
                    } 
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=assets/[name].[ext]' },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/img',
                                publicPath: 'assets/img'
                            }
                        }
                    ]
                }
            ],
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./index.html",
                title: 'Inferno TSX Template',
                filename: "index.html",
                chunksSortMode: "manual",
                chunks: ['vendors', 'app'],
                favicon: 'favicon.ico'
            }),
            new MiniCssExtractPlugin({
                filename: "style.css",
                chunkFilename: "style.css"
            }),
            new CopyWebpackPlugin([
                // copy static assets here
            ]),
            new webpack.DefinePlugin({
                // define environment vars here
            })
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    }
}