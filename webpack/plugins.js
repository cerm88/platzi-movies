const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenv = new Dotenv();

const miniCssExtractPlugin = (filename) => new MiniCssExtractPlugin({ filename });

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    inject: true,
});

module.exports = {
    Dotenv: dotenv,
    MiniCssExtractPlugin: miniCssExtractPlugin,
    HtmlWebpackPlugin: htmlWebpackPlugin,
};
