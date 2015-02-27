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
  require('./tasks/elasticsearchTask')(grunt);
  require('./tasks/kanjiTask')(grunt);

  grunt.loadNpmTasks('grunt-mkdir');

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'output/nihongo3.14_gh-pages'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      md: {
        files: ['docs/src/**/*.md'],
        tasks: ['showdown:multi']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
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

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html'],
        exclude: ['bower_components/bootstrap/dist/js/bootstrap.js']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.dist %>/images'
          }
        ]
      }
    },

    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= config.dist %>/images'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.dist %>',
            src: '{,*/}*.html',
            dest: '<%= config.dist %>'
          }
        ]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

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
      options: {
        coffee: true,
        extensions: 'coffee',
        specNameMatcher: 'Spec',
        projectRoot: 'tasks',
        specFolders: ['test/node']
      },
      all: ['test/node/']
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
        auth: require('./es-auth.js')
      },
      remote: {
        nb: 1,
        index: 'nihongo_20140117',
        hostname: 'elastic-vmn.rhcloud.com',
        port: 80,
        auth: require('./es-auth.js')
      }
    },
    esInit: {
      local: {
        index: 'nihongo_20150222',
        hostname: 'localhost',
        port: 9200,
        auth: require('./es-auth.js')
      },
      remote: {
        index: 'nihongo_20140117',
        hostname: 'elastic-vmn.rhcloud.com',
        port: 80,
        auth: require('./es-auth.js')
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
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      //'buildDocs',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'autoprefixer'
      ]);
    }

    grunt.task.run([
//            'connect:test',
//            'mocha'
      'karma'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'buildDocs',
    'prepare',
    'showdown:single',
    'epub',
    'csvToJson',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'jasmine_node',
    'test',
    'build'
  ]);

  grunt.registerTask('buildDocs', [
    'copy:docs',
    'showdown:multi'
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

  grunt.registerTask('prepare', function () {
    console.log('Mkdir .tmp/');
    grunt.file.mkdir('.tmp/');
  });
};
