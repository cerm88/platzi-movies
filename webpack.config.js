const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const loaders = require('./webpack/loaders.js');
const plugins = require('./webpack/plugins.js');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    mode: 'production',
    module: {
        rules: [loaders.JSLoader, loaders.CSSLoader('build/assets')],
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    plugins: [
        plugins.Dotenv,
        plugins.MiniCssExtractPlugin('[name].[contenthash].css'),
        plugins.HtmlWebpackPlugin,
    ],
};
