var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  del = require('del'),
  stylish = require('jshint-stylish'),
  fs = require('fs'),
  Server = require('karma').Server,
  through = require('through2'),
  _ = require('lodash');

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

gulp.task('clean', function (done) {
  del([
    config.tmp + '/**',
    config.dist + '/**',
    '!' + config.dist,
    '!' + config.dist + '/.git*'
  ]).then(function (paths) {
    done();
  });
});

gulp.task('style', ['clean'], function () {
  return gulp.src('app/styles/**/*.css')
    .pipe($.autoprefixer('> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'))
    .pipe(gulp.dest('.tmp/styles/'))
});

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
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.jasmineNode({
      timeout: 10000,
      verbose: true
    }))
});

gulp.task('copy:docs', ['clean'], function () {
  gulp.src(['docs/**'], {cwd: config.app})
    .pipe(gulp.dest(config.dist + '/docs'));
});

gulp.task('copy:fonts', ['clean'], function () {
  gulp.src([
    'bower_components/bootstrap/dist/fonts/*',
    'bower_components/font-awesome-bower/fonts/*'
    ])
    .pipe(gulp.dest(config.dist + '/fonts'));
});

gulp.task('copy:others', ['clean'], function () {
  gulp.src(['*.{ico,png,txt}', 'CNAME', 'images/**/*.webp','**/*.html','**/*.jpg'], {cwd: config.app})
    .pipe(gulp.dest(config.dist));
});

gulp.task('copy', ['copy:docs', 'copy:others', 'copy:fonts']);


gulp.task('default', ['clean', 'style', 'scripts', 'wiredep', 'karma', /*'jasmine-node',*/ 'docs:multiple']);

gulp.task('docs:multiple', function () {
  return gulp.src('docs/src/**/*.md')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.showdown({
      extensions: [require('showdown-furigana-extension'), 'table']
    }))
    .pipe(gulp.dest(config.app + '/docs/html'))
    .on('error', function (err) {
      $.notify({message: err})
    });
});

gulp.task('docs:single', ['clean'], function () {
  return gulp.src(
    require('./tasks/lib/configReader').getFileList('app/scripts/config.js', 'docs/html/Cours_3b'),
    {cwd: 'docs/src/Cours_3b'}
    )
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.showdown({
      extensions: [require('showdown-furigana-extension'), 'table']
    }))
    .pipe($.concat('single.html'))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('build', ['default', 'epub', 'epub-kanji', 'copy'], function () {
  return gulp.src(config.app + '/index.html')
    .pipe($.plumber({
      errorHandler: onError
    }))
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
  gulp.watch('docs/src/**/*.md', ['docs:multiple']);

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

gulp.task('webserver:production', function () {
  $.connect.server({
    livereload: true,
    root: [config.dist],
    port: 9000,
    host: 'localhost'
  });
});

gulp.task('serve', ['webserver', 'watch']);

gulp.task('kanji-lessons', ['clean'], function () {
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


function kanjiTestPlugin(){
  return through.obj(function(file,enc,callback){
    if(file.isNull() || file.isDirectory()){
      this.push(file);
      return callback();
    }

    // No support for streams
    if (file.isStream()) {
      this.emit('error', new PluginError({
        plugin: 'kanjiTestForm',
        message: 'Streams are not supported.'
      }));
      return callback();
    }

    if(file.isBuffer()) {
      var kanjis = JSON.parse(file.contents.toString());
      var vocabulary = _.chain(kanjis)
        .pluck('vocabulary')
        .flatten()
        .shuffle()
        .value();
      console.log(vocabulary);
      this.push(file);
      return callback();
    }
  });
}

gulp.task('kanjiTest',function(){
  gulp.src(config.app + '/docs/kanji-lessons/data/kanjis.json')
    .pipe(kanjiTestPlugin())
    .pipe(gulp.dest('.tmp'));
});
