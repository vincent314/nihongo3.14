var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var fs = require('fs');

gulp.task('kanji:lessons', ['clean'], function () {
  return gulp.src(config.app + '/docs/kanji-lessons/partials/kanji-lessons.html')
    .pipe($.debug())
    .pipe($.mustache({
        kanjis: JSON.parse(fs.readFileSync(config.app + '/docs/kanji-lessons/data/kanjis.json'))
      }
    ))
    .pipe(gulp.dest(config.tmp + '/kanji-lessons'));
});
