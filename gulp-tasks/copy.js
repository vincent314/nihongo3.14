var gulp = require('gulp');
var config = require('./config');

gulp.task('copy', ['copy:docs', 'copy:others', 'copy:fonts']);

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
