var gulp = require('gulp');

gulp.task('epub', ['docs:single'], function (done) {
  // calibre must be installed and ebook-convert must exist.
  var convert = require('ebook-convert');
  var epub = convert({
    source: '.tmp/single.html',
    target: './app/docs/epub/Cours de japonais niveau 3 2014-2015.epub',
    arguments: [
      '--page-breaks-before', '//h:h1',
      '--authors', 'Vincent M.',
      '--title', 'Cours de japonais niveau 3 2014/2015',
      '--level1-toc', '//h:h1'
    ]
  });

  epub.on('end', function () {
    console.log('Epub generated !');
    done();
  });
  epub.on('error', function (res) {
    console.log('Error : ' + res);
    done();
  });
  epub.on('exit', function (res) {
    if (res !== 0) {
      done();
      throw new Error('Epub creation Error (Error ' + res + ')');
    }
    done();
  });
});

gulp.task('epub-kanji', ['kanji:lessons'], function (done) {
  // calibre must be installed and ebook-convert must exist.
  var convert = require('ebook-convert');
  var epub = convert({
    source: '.tmp/kanji-lessons/kanji-lessons.html',
    target: './app/docs/kanji-lessons/epub/kanji-lessons.epub',
    arguments: [
      '--page-breaks-before', '//h:h2',
      '--authors', 'Vincent M.',
      '--title', 'Apprentissage des Kanji',
      '--level1-toc', '//h:h2'
    ]
  });

  epub.on('end', function () {
    console.log('Epub generated !');
    done();
  });
  epub.on('error', function (res) {
    console.log('Error : ' + res);
    done();
  });
  epub.on('exit', function (res) {
    if (res !== 0) {
      done();
      console.log(res);
      throw new Error('Epub creation Error (Error ' + res + ')');
    }
    done();
  });
});
