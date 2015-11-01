var gulp = require('gulp'),
$ = require('gulp-load-plugins')(),
del = require('del'),
stylish = require('jshint-stylish'),
fs = require('fs'),
Server = require('karma').Server;

require('coffee-script/register');

// Configurable paths
var config = {
  tmp: '.tmp',
  app: 'app',
  dist: 'output/nihongo3.14_gh-pages'
};

var onError = function (err) {
  console.log(err);
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

gulp.task('default', ['clean','style','script','wiredep','karma','jasmine-node','docs:multiple'], function () {
  return gulp.start('style', 'scripts');
});

gulp.task('docs:multiple', function () {
  return gulp.src('docs/src/**/*.md')
    .pipe($.showdown({
      extensions: [require('showdown-furigana-extension'), 'table']
    }))
    .pipe(gulp.dest(config.app + '/docs/html'))
    .on('error', function (err) {
      $.notify({message: err})
    });
});

gulp.task('docs:single', function () {
  return gulp.src(
    require('./tasks/lib/configReader').getFileList('app/scripts/config.js', 'docs/html/Cours_3b'),
    {cwd: 'docs/src/Cours_3b'}
  )
    .pipe($.debug())
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.showdown({
      extensions: [require('showdown-furigana-extension'), 'table']
    }))
    .pipe($.concat('single.html'))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('build', ['clean', 'style', 'scripts', 'copy', 'docs:multiple', 'epub', 'epub-kanji'], function () {
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
  gulp.watch(config.app + '/scripts/**/*.js', ['scripts']);
  gulp.watch('docs/src/**/*.md',['docs:multiple']);

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

gulp.task('kanji-lessons', function () {
  return gulp.src(config.app + '/docs/kanji-lessons/partials/kanji-lessons.html')
    .pipe($.debug())
    .pipe($.mustache({
        kanjis: JSON.parse(fs.readFileSync(config.app + '/docs/kanji-lessons/data/kanjis.json'))
      }
    ))
    .pipe(gulp.dest(config.tmp + '/kanji-lessons'));
});

gulp.task('epub', ['docs:single'], function (done) {
  // calibre must be installed and ebook-convert must exist.
  var convert = require('ebook-convert');
  var epub = convert({
    source: '.tmp/single.html',
    target: './app/docs/epub/Cours de japonais niveau 3 2014-2015.epub',
    arguments: [
      '--page-breaks-before', '//h:h1',
      '--authors', 'Vincent M.',
      '--title', 'Cours de japonais niveau 3 2014/2015',
      '--level1-toc', '//h:h1'
    ]
  });

  epub.on('end', function () {
    console.log('Epub generated !');
    done();
  });
  epub.on('error', function (res) {
    console.log('Error : ' + res);
    done();
  });
  epub.on('exit', function (res) {
    if (res !== 0) {
      done();
      throw new Error('Epub creation Error (Error ' + res + ')');
    }
    done();
  });
});

gulp.task('epub-kanji', ['kanji-lessons'], function (done) {
  // calibre must be installed and ebook-convert must exist.
  var convert = require('ebook-convert');
  var epub = convert({
    source: '.tmp/kanji-lessons/kanji-lessons.html',
    target: './app/docs/kanji-lessons/epub/kanji-lessons.epub',
    arguments: [
      '--page-breaks-before', '//h:h2',
      '--authors', 'Vincent M.',
      '--title', 'Apprentissage des Kanji',
      '--level1-toc', '//h:h2'
    ]
  });

  epub.on('end', function () {
    console.log('Epub generated !');
    done();
  });
  epub.on('error', function (res) {
    console.log('Error : ' + res);
    done();
  });
  epub.on('exit', function (res) {
    if (res !== 0) {
      done();
      console.log(res);
      throw new Error('Epub creation Error (Error ' + res + ')');
    }
    done();
  });
});
