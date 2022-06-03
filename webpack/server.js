const path = require('path');

const devServer = (dir) => ({
    static: { directory: path.join(__dirname, dir) },
    compress: true,
    historyApiFallback: true,
    port: 3000,
});

module.exports = { devServer };
