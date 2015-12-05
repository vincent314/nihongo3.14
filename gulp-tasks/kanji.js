var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var config = require('./config');
var fs = require('fs');
var through = require('through2');
var _ = require('lodash');


gulp.task('kanji:lessons', ['clean'], function () {
  gulp.src(config.app + '/docs/kanji-lessons/partials/kanji-lessons.html')
    .pipe($.debug())
    .pipe($.mustache({
        kanjis: JSON.parse(fs.readFileSync(config.app + '/docs/kanji-lessons/data/kanjis.json'))
      }
    ))
    .pipe(gulp.dest(config.tmp + '/kanji-lessons'));
});



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
      var list = _.chain(kanjis)
        .pluck('vocabulary')
        .flatten()
        .value();


      var japanese = _.chain(list)
        .map(function(obj){
          return _.pick(obj, 'japanese');
        })
        .shuffle()
        .value();

      var meaning = _.chain(list)
        .map(function(obj){
          return _.pick(obj, 'meaning');
        })
        .shuffle()
        .value();

      var csv = _.chain(japanese)
        .concat(meaning)
        .map(function(vocabulary){
          return [vocabulary.japanese,vocabulary.reading,vocabulary.meaning].join(';')
        })
        .value()
        .join('\n');

      console.log(csv);

      var outFile = new gutil.File();
      outFile.path = 'kanjiTestForm.csv';
      outFile.contents = new Buffer(csv);

      this.push(outFile);
      return callback();
    }
  });
}

gulp.task('kanji:testForm',function(){
  gulp.src(config.app + '/docs/kanji-lessons/data/kanjis.json')
    .pipe(kanjiTestPlugin())
    .pipe(gulp.dest('.tmp'));
});
