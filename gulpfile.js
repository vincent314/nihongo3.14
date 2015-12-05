var gulp = require('gulp');

require('coffee-script/register');

require('require-dir')('./gulp-tasks');

gulp.task('default', ['clean', 'style', 'scripts', 'wiredep', 'karma', /*'jasmine-node',*/ 'docs:multiple']);


gulp.task('compile', function () {
  return gulp.src(config.app + '/ts/**/*.ts')
    .pipe(ts({
      out: 'main.js'
    }))
    .pipe(gulp.dest(config.tmp + '/ts'));
});
