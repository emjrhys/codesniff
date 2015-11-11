var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    target: 'web',
    debug: true,
    watch: false,
    output: {
        path: path.join(__dirname, 'dist', 'assets'),
        publicPath: '/assets/',
        filename: 'main.js',
        chunkFilename: '[chunkhash].js'
    },
    resolve: {
        modulesDirectories: ['bower_components', 'node_modules'],
    },
    module: {
        loaders: [
            { test: /\.css/, loader: 'style-loader!css-loader' },
            { test:/\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
            { test: /\.jpg/, loader: "url-loader?limit=10000&minetype=image/jpg" },
            { test: /\.png/, loader: "url-loader?limit=10000&minetype=image/png" },
            { test: /\.js$/, loader: "jsx-loader" },
            { test: /\.coffee$/, loader: "jsx-loader!coffee-loader" }
        ],
        noParse: /\.min\.js/
    },
    plugins: [
              // If you want to minify everything
              // new webpack.optimize.UglifyJsPlugin()
    ]
};
