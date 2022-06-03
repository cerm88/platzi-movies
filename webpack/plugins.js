const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenv = new Dotenv();

const miniCssExtractPlugin = (filename) => new MiniCssExtractPlugin({ filename });

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    inject: true,
    template: './index.html',
    filename: 'index.html',
});

module.exports = {
    Dotenv: dotenv,
    MiniCssExtractPlugin: miniCssExtractPlugin,
    HtmlWebpackPlugin: htmlWebpackPlugin,
};
