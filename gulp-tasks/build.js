var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var onError = require('./onerror');

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
