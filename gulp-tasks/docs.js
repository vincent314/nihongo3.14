var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var onError = require('./onerror');

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
    require('../tasks/lib/configReader').getFileList('app/scripts/config.js', 'docs/html/Cours_3b'),
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
