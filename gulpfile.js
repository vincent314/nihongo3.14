var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
del = require('del'),
stylish = require('jshint-stylish'),
Server = require('karma').Server;

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
    .pipe($.autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
    .pipe(gulp.dest('.tmp/styles/'))
});

gulp.task('scripts', function () {
  return gulp.src(['Gruntfile.js',
    config.app + '/scripts/**/*.js',
    config.app + '/scripts/vendor/*',
    'test/spec/**/*.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter(stylish));
});

gulp.task('wiredep', function () {
  return gulp.src(config.app + '/index.html')
    .pipe($.wiredep({
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
    .pipe($.jasmineNode({
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

gulp.task('docs',function(){
  gulp.src('docs/src/**/*.md')
    .pipe($.showdown({
      extensions:[require('showdown-furigana-extension'),'table']
    }))
    .pipe(gulp.dest(config.app + '/docs/html'))
    .on('error',function(err) {
      console.log(err);
    });
});

gulp.task('build', ['clean','style','scripts'], function () {
  return gulp.src(config.app + '/index.html')
    .pipe($.usemin({
      cssvendor: [$.rev()],
      cssmain: [$.rev()],
      html: [$.minifyHtml({
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
      jsvendor: [$.uglify(), $.rev()],
      jsplugins: [$.uglify(), $.rev()],
      jsmain: [$.uglify(), $.rev()]
    }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('watch', function () {
  gulp.watch('bower.json', ['wiredep']);
  //gulp.watch(config.app + '/scripts/**/*.js', ['scripts']);
  //gulp.watch(config.app + '/styles/**/*.css', ['style']);

  $.livereload.listen();

  gulp.watch(config.app + '/**').on('change', $.livereload.changed);
});

gulp.task('webserver', function () {
  $.connect.server({
    livereload: true,
    root: ['.tmp', '.', config.app],
    port: 9000,
    host: 'localhost'
  });
});

gulp.task('serve', ['webserver', 'watch']);
