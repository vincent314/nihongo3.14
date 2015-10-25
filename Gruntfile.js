// Generated on 2014-10-29 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'output/nihongo3.14_gh-pages'
  };

  function getEsAuth() {
    try{
      return require('./es-auth.js');
    } catch(e){
      grunt.log.warn('No es-auth.js found, continue');
      return null;
    }
  }

  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    webpack: {
      options: webpackConfig,
      build:{}
    },
    'webpack-dev-server': {
      options: {
        webpack:webpackConfig,
        contentBase:'app/'
      },
      start: {
        keepalive: true
      }
    },
    watch: {
      app: {
        files: ['app/**/*'],
        tasks: ['webpack:build'],
        options: {
          spawn: false
        }
      }
    },
    // Empties folders to start fresh
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              '.tmp',
              '<%= config.dist %>/*',
              '!<%= config.dist %>/.git*'
            ]
          }
        ]
      },
      server: '.tmp'
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    // Copies remaining files to places other tasks can use
    copy: {
      docs: {
        files: [{
          expand: true,
          dots: true,
          cwd: 'docs/src/',
          src: '**/*.html',
          dest: 'app/docs/html'
        }]
      },
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              '*.{ico,png,txt}',
              'CNAME',
              'images/{,*/}*.webp',
              '{,*/}*.html',
              'styles/fonts/{,*/}*.*',
              'docs/**/*.*'
            ]
          },
          {
            src: 'node_modules/apache-server-configs/dist/.htaccess',
            dest: '<%= config.dist %>/.htaccess'
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/bootstrap/dist',
            src: 'fonts/*',
            dest: '<%= config.dist %>'
          },
          {
            expand: true,
            dot: true,
            cwd: 'bower_components/font-awesome-bower',
            src: 'fonts/*',
            dest: '<%= config.dist %>'
          }
        ]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    showdown: {
      options: {
        extensions: ['table'],
        customExtensions: ['showdown-furigana-extension']
      },
      multi: {
        files: [
          {
            cwd: 'docs/src',
            src: '**/*.md',
            dest: 'app/docs/html/'
          }]
      },
      single: {
        files: [
          {
            cwd: 'docs/src/Cours_3b',
            src: require('./tasks/lib/configReader').getFileList('app/scripts/config.js', 'docs/html/Cours_3b'),
            dest: '.tmp/single.html'
          }]
      },
      mkdir: {
        all: {
          options: {
            create: ['.tmp']
          }
        }
      }
    },
    jasmine_node: {
      forceExit:true,
      extensions: 'coffee',
      specNameMatcher: 'Spec',
      projectRoot: 'tasks/',
      specFolders: ['test/node']
    },
    debug: {
      options: {
        open: false // do not open node-inspector in Chrome automatically
      }
    },
    esLoad: {
      local: {
        nb: 1,
        index: 'nihongo_20140117',
        hostname: 'localhost',
        port: 9200,
        auth: getEsAuth()
      },
      remote: {
        nb: 1,
        index: 'nihongo_20140117',
        hostname: 'elastic-vmn.rhcloud.com',
        port: 80,
        auth: getEsAuth()
      }
    },
    esInit: {
      local: {
        index: 'nihongo_20150222',
        hostname: 'localhost',
        port: 9200,
        auth: getEsAuth()
      },
      remote: {
        index: 'nihongo_20140117',
        hostname: 'elastic-vmn.rhcloud.com',
        port: 80,
        auth: getEsAuth()
      }
    },
    csvToJson: {
      default: {
        src: './docs/src/kanji/Nihongo data - Kanji.csv'
      }
    },
    xmlToJson: {
      ichi: {
        src: './docs/src/kanji/kanji.xml',
        dest: 'app/docs/kanji/kanji_1.json',
        jouyou: 1
      },
      ni: {
        src: './docs/src/kanji/kanji.xml',
        dest: 'app/docs/kanji/kanji_2.json',
        jouyou: 2
      },
      san: {
        src: './docs/src/kanji/kanji.xml',
        dest: 'app/docs/kanji/kanji_3.json',
        jouyou: 3
      },
      yon: {
        src: './docs/src/kanji/kanji.xml',
        dest: 'app/docs/kanji/kanji_4.json',
        jouyou: 4
      },
      go: {
        src: './docs/src/kanji/kanji.xml',
        dest: 'app/docs/kanji/kanji_5.json',
        jouyou: 5
      }
    },
    mustache_mustache:{
      options:{
        partials:'app/docs/kanji-lessons/partials/partials/',
        data:'app/docs/kanji-lessons/data/'
      },
      globbing:{
        expand:true,
        cwd:'app/docs/kanji-lessons/partials',
        src: ['*.html'],
        dest:'.tmp/kanji-lessons/'
      }
    }
  });

  grunt.registerTask('serve', ['webpack-dev-server:start']);

  grunt.registerTask('dev', ['webpack:build', 'webpack-dev-server:start']);

  grunt.registerTask('build', [
    'clean:dist',
    'buildDocs',
    'prepare',
    'showdown:single',
    'epub',
    'csvToJson',
    'concurrent:dist',
    'copy:dist',
    'rev',
    'webpack:build',
    'kanji-lessons'
  ]);

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test'
      ]);
    }

    grunt.task.run([
//            'connect:test',
//            'mocha'
      'karma'
    ]);
  });

  grunt.registerTask('buildDocs', [
    'copy:docs',
    'showdown:multi'
  ]);

  grunt.registerTask('kanji-lessons', [
    'mustache_mustache',
    'epub-kanji'
  ]);

  grunt.registerTask('epub', 'Generate epub file', function () {
    // calibre must be installed and ebook-convert must exist.
    var done = this.async();
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

  grunt.registerTask('epub-kanji', 'Generate KANJI epub file', function () {
    // calibre must be installed and ebook-convert must exist.
    var done = this.async();
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
        throw new Error('Epub creation Error (Error ' + res + ')');
      }
      done();
    });
  });

  grunt.registerTask('prepare', function () {
    console.log('Mkdir .tmp/');
    grunt.file.mkdir('.tmp/');
  });
};
