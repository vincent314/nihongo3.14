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
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-strap/dist/angular-strap.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/lodash/dist/lodash.js',
      'bower_components/speakingurl/speakingurl.min.js',
      //'app/ts/app.ts',
      //'app/ts/services/*.ts',
      //'app/ts/controllers/*.ts',
      //'app/ts/filters/*.ts',
      //'test/spec/*.js',
      //'test/spec/**/*.js',
      //'test/spec/**/*.ts',
      //'test/spec/tsSpec.ts',
      'test/spec/testappSpec.ts',
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
      "**/*.ts": ['typescript']
      //"app/scripts/**/*.js": "coverage"
    },

    typescriptPreprocessor: {
      tsconfigPath: './test/spec/tsconfig.json',
      compilerOptions: { // *optional
        removeComments: false
      },
      ignorePath: function(path){ // ignore all files that ends with .d.ts (this files will not be served)
        return /\.d\.ts$/.test(path);
      },
      // transforming the filenames
      // you can pass more than one, they will be execute in order
      transformPath: [function(path) { // *optional
        return path.replace(/\.ts$/, '.js');
      }, function(path) {
        return path.replace(/[\/\\]test[\/\\]/i, '/'); // remove directory test and change to /
      }]
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
