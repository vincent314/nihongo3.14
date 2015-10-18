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
        publicPath: '/' + webpackConfig.output.publicPath
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
    }
  });

  grunt.registerTask('default', ['webpack-dev-server:start']);

  grunt.registerTask('dev', ['webpack:build', 'webpack-dev-server:start']);

  grunt.registerTask('build', ['webpack:build'])
};
