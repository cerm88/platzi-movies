const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// https://platzi.com/clases/2242-webpack/36263-deploy-a-netlify/
module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js',
        clean: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: path.resolve(__dirname, './dist/css/') },
                    },
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    postcssPresetEnv({
                                        browsers: ['last 4 versions', '> 5%', 'ie > 9'],
                                    }),
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new Dotenv(),
        new MiniCssExtractPlugin({ filename: 'app.css' }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html',
            filename: 'index.html',
        }),
    ],
    devServer: {
        static: { directory: path.join(__dirname, './dist') },
        compress: true,
        historyApiFallback: true,
        port: 3000,
    },
};
