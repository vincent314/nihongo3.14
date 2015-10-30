var gulp = require('gulp'),
del = require('del'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
autoprefxer = require('gulp-autoprefixer');

// Configurable paths
var config = {
  tmp: '.tmp',
  app: 'app',
  dist: 'output/nihongo3.14_gh-pages'
};

gulp.task('clean', function (cb) {
  del([config.tmp, config.dist], cb);
});

gulp.task('style', function ()
{
  gulp.src('app/styles/**/*.css')
    .pipe(autoprefxer(['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']))
    .pipe(gulp.dest('.tmp/styles/'))
});

gulp.task('scripts', function () {
  gulp.src(['Gruntfile.js',
    config.app + '/scripts/**/*.js',
    config.app + '/scripts/vendor/*',
    'test/spec/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['clean'], function () {
  gulp.start(['style', 'scripts']);
});

