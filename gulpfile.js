var gulp = require('gulp');

require('coffee-script/register');

require('require-dir')('./gulp-tasks');

gulp.task('default', ['clean', 'style', 'scripts', 'wiredep', 'karma', /*'jasmine-node',*/ 'docs:multiple']);
