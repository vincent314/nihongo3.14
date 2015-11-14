var gulp = require('gulp'),
  through = require('through2'),
  _ = require('lodash');

require('coffee-script/register');

require('require-dir')('./gulp-tasks');

gulp.task('default', ['clean', 'style', 'scripts', 'wiredep', 'karma', /*'jasmine-node',*/ 'docs:multiple']);



function kanjiTestPlugin(){
  return through.obj(function(file,enc,callback){
    if(file.isNull() || file.isDirectory()){
      this.push(file);
      return callback();
    }

    // No support for streams
    if (file.isStream()) {
      this.emit('error', new PluginError({
        plugin: 'kanjiTestForm',
        message: 'Streams are not supported.'
      }));
      return callback();
    }

    if(file.isBuffer()) {
      var kanjis = JSON.parse(file.contents.toString());
      var vocabulary = _.chain(kanjis)
        .pluck('vocabulary')
        .flatten()
        .shuffle()
        .value();
      console.log(vocabulary);
      this.push(file);
      return callback();
    }
  });
}

gulp.task('kanjiTest',function(){
  gulp.src(config.app + '/docs/kanji-lessons/data/kanjis.json')
    .pipe(kanjiTestPlugin())
    .pipe(gulp.dest('.tmp'));
});
