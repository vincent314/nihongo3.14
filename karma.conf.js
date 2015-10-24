// Karma configuration
var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    reporters: ['coverage'],

    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './app/scripts/app.js',
      './node_modules/angular-mocks/angular-mocks.js',
      './test/spec/config-test.js', // overwrite normal configuration
      './test/spec/*Spec.js',
      './test/spec/**/*Spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    preprocessors: {
      './app/scripts/app.js': ['webpack']
    },

    ngHtml2JsPreprocessor: {
      cacheIdFromPath: function (filepath) {
        return filepath.replace(new RegExp('(^app/|^test/html/)'), '');
      },
      moduleName: 'templates'
    },

    coverageReporter: {
      reporters: [{
        type: 'html',
        dir: 'output/coverage/'
      },
        {type: 'text'},
        {type: 'text-summary'}]
    },

    webpack: require('./webpack.config.spec'),

    plugins: [
      require('karma-webpack'),
      require('karma-coverage'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-sourcemap-loader')
    ]
  });
};
