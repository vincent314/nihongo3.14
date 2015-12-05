var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./config');

gulp.task('serve', ['webserver', 'watch']);

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

gulp.task('watch', function () {
  gulp.watch('bower.json', ['wiredep']);
  gulp.watch(config.app + '/ts/**/*.js', ['compile']);
  gulp.watch('docs/src/**/*.md', ['docs:multiple']);

  $.livereload.listen();

  gulp.watch(config.app + '/**').on('change', $.livereload.changed);
});

