const path = require('path');
const loaders = require('./webpack/loaders.js');
const plugins = require('./webpack/plugins.js');
const server = require('./webpack/server.js');

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js',
        clean: true,
    },
    mode: 'development',
    module: {
        rules: [loaders.JSLoader, loaders.CSSLoader('./dist/assets/')],
    },
    plugins: [plugins.Dotenv, plugins.MiniCssExtractPlugin('app.css'), plugins.HtmlWebpackPlugin],
    devServer: server.devServer('./dist/'),
};
