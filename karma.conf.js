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
      //'app/scripts/app.js',
      //'app/scripts/services/*.js',
      //'app/scripts/controllers/*.js',
      //'app/scripts/filters/*.js',
      //'test/spec/*.js',
      //'test/spec/**/*.js',
      'test/spec/**/*.ts',
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
      // options passed to the typescript compiler
      options: {
        sourceMap: true, // (optional) Generates corresponding .map file.
        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
        noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
        noResolve: true, // (optional) Skip resolution and preprocessing.
        removeComments: true, // (optional) Do not emit comments to output.
        concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
      },
      typings: [
        'typings/tsd.d.ts'
      ],
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      }
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
