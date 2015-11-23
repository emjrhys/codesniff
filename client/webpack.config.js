var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    context: __dirname + '/src',
    target: 'web',
    debug: true,
    watch: false,
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
        ],
    }
};
