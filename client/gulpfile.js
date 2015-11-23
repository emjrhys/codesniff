path = require('path');
gulp = require('gulp');
gutil = require('gulp-util');
sass = require('gulp-sass');
clean = require('gulp-clean');
webpack = require('webpack');
webpackDevServer = require('webpack-dev-server');

// Configs
webpackConfig = require('./webpack.config.js');
if (gulp.env.proudction) {
    // Do production stuff
}

var myDevConfig = Object.create(webpackConfig);
var devCompiler = webpack(myDevConfig);

sassConfig = { includePaths: ['src/styles'] };
vendorPaths = {
    
}

// Tasks

gulp.task('clean', function() {
    return gulp.src('dist', { read: false } )
        .pipe(clean());
})

.task('sass', ['clean'], function() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sass(sassConfig).on('error', gutil.log))
        .pipe(gulp.dest('dist'));
})

.task('copy', ['clean'], function() {
    return gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'));
})

.task('webpack:dev-server', ['sass', 'copy'], function(cb) {
    execWebpack(cb)
})

.task('webpack:build-dev', function(cb) {
    
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build-dev', err);
        gutil.log('[webpack:build-dev]', stats.toString({ colors: true }));
        cb();
    });
})

.task('webpack:build', ['sass', 'copy'], function(cb) {

    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError('webpack:build', err);
        gutil.log('[webpack.build]', stats.toString({ colors: true }));
        cb();
    });
})

.task('dev', ['webpack:dev-server'], function() {
    gulp.watch(['src/**/*'], ['webpack:build-dev']);
})


.task('build', ['webpack:build'])

.task('default', ['build']);

var execWebpack = function(cb) {

    new webpackDevServer(webpack(webpackConfig), {
        contentBase: __dirname + '/dist/',
        publicPath: webpackConfig.output.publicPath,
        quiet: true,
    }).listen(8080, "localhost", function(err) {
    
        if(err)
            throw new gutil.PluginError('webpack-dev-server', err);

        gutil.log('[webpack-dev-server]', "http://localhost:8080/webpack-dev-server/index.html");

        cb();
    });

};
