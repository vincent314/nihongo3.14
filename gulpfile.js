var gulp = require('gulp'),
del = require('del'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
autoprefxer = require('gulp-autoprefixer'),
livereload = require('gulp-livereload'),
wiredep = require('gulp-wiredep'),
Server = require('karma').Server,
coffee = require('gulp-coffee'),
jasmineNode = require('gulp-jasmine-node'),
usemin = require('gulp-usemin'),
uglify = require('gulp-uglify'),
minifyHtml = require('gulp-minify-html'),
rev = require('gulp-rev'),
connect = require('gulp-connect');

require('coffee-script/register');

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
    .pipe(jshint.reporter(stylish))
    .pipe(concat());
});

gulp.task('wiredep', function () {
  return gulp.src(config.app + '/index.html')
    .pipe(wiredep({
      ignorePath: /^\/|\.\.\//,
      exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
    }))
    .pipe(gulp.dest(config.app));
});

gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function (err) {
    console.log(err);
    done();
  }).start();
});

gulp.task('jasmine-node', function () {
  return gulp.src(['test/node/**/*Spec.coffee'])
    .pipe(jasmineNode({
      timeout: 10000,
      verbose: true
    }))
});

gulp.task('copy', function () {
  return gulp.src([
      '*.{ico,png,txt}',
      'CNAME',
      'images/{,*/}*.webp',
      '{,*/}*.html',
      'styles/fonts/{,*/}*.*',
      'docs/**/*.*'
    ], {cwd: config.app}
  )
    .pipe(gulp.dest(config.dist));
});

gulp.task('default', ['clean'], function () {
  return gulp.start('style', 'scripts');
});

gulp.task('build', function () {
  return gulp.src(config.app + '/index.html')
    .pipe(usemin({
      cssvendor: [rev()],
      cssmain: [rev()],
      html: [minifyHtml({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeAttributeQuotes: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      })],
      jsvendor: [uglify(), rev()],
      jsplugins: [uglify(), rev()],
      jsmain: [uglify(), rev()]
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('watch', function () {
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch(config.app + '/scripts/**/*.js', ['scripts']);
  gulp.watch(config.app + '/styles/**/*.css', ['style']);

  livereload.listen();

  gulp.watch(config.dist + '/**').on('change', livereload.changed);
});

gulp.task('webserver', function () {
  connect.server({
    livereload:true,
    root:['.tmp','.',config.app],
    port:9000,
    host:'localhost',
    open:true
  });
});

gulp.task('serve',['webserver','watch']);
