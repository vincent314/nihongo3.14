var gulp = require('gulp');
var config = require('./config');
var ts = require('gulp-typescript');

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  sortOutput: true
});

var tsTests = ts.createProject({
  declarationFiles: false,
  noExternalResolve: false,
  sortOutput: true
});

gulp.task('compile', function () {
  return gulp.src(config.app + '/ts/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(gulp.dest(config.tmp + '/gulp-typescript/app'));
});

gulp.task('compileTest', function () {
  return gulp.src(config.test + '/spec/**/*.ts')
    .pipe(ts(tsTests))
    .pipe(gulp.dest(config.tmp + '/gulp-typescript/test'))
});
