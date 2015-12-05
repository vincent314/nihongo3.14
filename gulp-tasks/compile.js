var gulp = require('gulp');
var config = require('./config');
var ts = require('gulp-typescript');

gulp.task('compile', function () {
  return gulp.src(config.app + '/ts/**/*.ts')
    .pipe(ts({
      out: 'main.js'
    }))
    .pipe(gulp.dest(config.app + '/gen'));
});
