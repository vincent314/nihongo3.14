var gulp = require('gulp');
var config = require('./config');
del = require('del'),

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
