var gulp = require('gulp'),
del = require('del'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
autoprefxer = require('gulp-autoprefixer'),
livereload = require('gulp-livereload'),
wiredep = require('gulp-wiredep'),
Server = require('karma').Server,
jasmineNode = require('gulp-jasmine-node');
// Configurable paths
var config = {
  tmp: '.tmp',
  app: 'app',
  dist: 'output/nihongo3.14_gh-pages'
};

gulp.task('clean', function (cb) {
  return del([config.tmp, config.dist], cb);
});

gulp.task('style', function () {
  return gulp.src('app/styles/**/*.css')
    .pipe(autoprefxer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
    .pipe(gulp.dest('.tmp/styles/'))
});

gulp.task('scripts', function () {
  return gulp.src(['Gruntfile.js',
    config.app + '/scripts/**/*.js',
    config.app + '/scripts/vendor/*',
    'test/spec/**/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('wiredep', function () {
  return gulp.src(config.app + '/index.html')
    .pipe(wiredep({
      ignorePath: /^\/|\.\.\//,
      exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
    }))
    .pipe(gulp.dest(config.app));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('jasmine-node', function () {
  return gulp.src(['test/node/**/*Spec.coffee'])
    .pipe(jasmineNode({
      timeout: 10000,
      coffee: true,
      verbose: true
    }))
});

gulp.task('default', ['clean'], function () {
  return gulp.start('style', 'scripts');
});

gulp.task('watch', function () {
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch(config.app + '/scripts/**/*.js', ['scripts']);
  gulp.watch(config.app + '/styles/**/*.css', ['style']);

  livereload.listen();

  gulp.watch(config.dist + '/**').on('change', livereload.changed);
});
