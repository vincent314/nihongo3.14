// Karma configuration
module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    reporters: ['coverage'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/lodash/dist/lodash.js',
      'bower_components/speakingurl/speakingurl.min.js',
      'app/scripts/app.js',
      'app/scripts/services/*.js',
      'app/scripts/controllers/*.js',
      'test/spec/*.js',
      'test/spec/**/*.js',
      'node_modules/ng-midway-tester/src/ngMidwayTester.js',
      'test/html/**/*.html',
      'app/templates/*.html'
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
      "app/templates/*.html": "ng-html2js",
      "test/html/dir/*.html": "ng-html2js",
      "app/scripts/**/*.js": "coverage"
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
    }
  });
};
