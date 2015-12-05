var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var onError = require('./onerror');
var stylish = require('jshint-stylish');

gulp.task('scripts', function () {
  return gulp.src(['Gruntfile.js',
      config.app + '/scripts/**/*.js',
      config.app + '/scripts/vendor/*',
      'test/spec/**/*.js'])
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(stylish));
});

gulp.task('style', ['clean'], function () {
  return gulp.src('app/styles/**/*.css')
    .pipe($.autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
    .pipe(gulp.dest('.tmp/styles/'))
});

gulp.task('wiredep', function () {
  return gulp.src(config.app + '/index.html')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.wiredep({
      ignorePath: /^\/|\.\.\//,
      exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
    }))
    .pipe(gulp.dest(config.app));
});
