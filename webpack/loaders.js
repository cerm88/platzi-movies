const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const JSLoader = {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
        },
    },
};

const optionsPostCssLoader = {
    postcssOptions: {
        plugins: [
            postcssPresetEnv({
                browsers: ['last 4 versions', '> 5%', 'ie > 9'],
            }),
        ],
    },
};

const CSSLoader = (dir) => ({
    test: /\.css$/i,
    exclude: /node_modules/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: path.resolve(__dirname, dir) },
        },
        {
            loader: 'css-loader',
            options: { importLoaders: 1 },
        },
        {
            loader: 'postcss-loader',
            options: optionsPostCssLoader,
        },
    ],
});

module.exports = {
    CSSLoader,
    JSLoader,
};
