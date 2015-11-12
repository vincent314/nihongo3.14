var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var onError = require('./onerror');
var Server = require('karma').Server;

gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/../karma.conf.js',
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
