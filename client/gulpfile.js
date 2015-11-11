path = require('path');
gulp = require('gulp');
gutil = require('gulp-util');
sass = require('gulp-sass');
clean = require('gulp-clean');
webpack = require('webpack');


// Configs
webpackConfig = require('./webpack.config.js');
if (gulp.env.proudction) {
    // Do production stuff
}

sassConfig = { includePaths: ['src/styles'] };

// Tasks

gulp.task('clean', function() {
    return gulp.src('dist', { read: false } )
        .pipe(clean());
})

.task('sass', function() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass(sassConfig).on('error', gutil.log))
        .pipe(gulp.dest('dist/assets'));
})

.task('vendor', function() {
    paths = vendorPaths.map(function(p) {
        path.resolve('./bower_components', p);
    });
    return gulp.src(paths)
        .pipe(gulp.dest('dist/assets/vendor'));
})

.task('copy', function() {
    return gulp.src(['src/**/*'])
        .pipe(gulp.dest('dist'));
})

.task('webpack', function(cb) {
    execWebpack(webpackConfig);
    cb();
})

.task('dev', ['build'], function() {
    servers = createServers(35729);
    gulp.watch(['src/**/*'], function(e) { gulp.run('build'); });
    gulp.watch(['./dist/**/*'], function(e) {
         gutil.log(gutil.colors.cyan(e.path), 'changed');
         return servers.lr.changed({
            body: {
                files: [e.path]
            }
         });
})

.task('build', ['webpack', 'sass', 'copy', 'vendor'], function() {} );

.task('default', ['build'], function() {} );

var createServers = function(port) {
    lr = tiny_lr();
    lr.listen(lrport, function() {
        gutil.log('LiveReload listening on ', lrport);
    });
    return {lr: lr}
};

var execWebpack = function(config) {
    webpack(config, function(err, stats) {
        if (err)
            throw new gutil.PluginError('execWebpack', err);
        gutil.log('[execWebpack]', stats.toString({colors: true}));
    }
};
