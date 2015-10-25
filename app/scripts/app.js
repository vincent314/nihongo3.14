'use strict';

var angular = require('angular');
require('./vendor')();
require('../styles/main.css');
var pageUrl = require('page.html');

var getSlug = require('speakingurl');

module.exports = angular.module('nihongo', [
  'infinite-scroll',
  'pascalprecht.translate',
  'mgcrea.ngStrap.popover',
  require('angular-route'),
  require('angular-sanitize'),
  require('angular-resource'),
  require('./config'),
  require('./controllers/headerController'),
  require('./controllers/kanjiController'),
  require('./controllers/pageController'),
  require('./controllers/searchController'),
  require('./controllers/timelineController'),
  require('./controllers/tocController'),
  require('./filters/percentageFilter'),
  require('./translate')
])
  .config(['$routeProvider', 'CONFIG', configureAngular])
  .run(['$rootScope', '$route', setTitle]);

/**
 * Build angular routes
 *
 * @param $routeProvider
 * @param CONFIG
 */
function configureAngular($routeProvider, CONFIG) {
  _.forEach(CONFIG.categories,function (category) {
    _.forEach(category.pages,function (page) {
      var route = '/' + getSlug(category.title) + '/' + getSlug(page.title);
      $routeProvider.when(route, {
        templateUrl: pageUrl,
        controller: 'PageController',
        title: page.title,
        resolve: {
          params: function () {
            return {
              url: category.dir + '/' + page.file
            };
          }
        }
      });
    });
  });
  $routeProvider.when('/timeline', {
    templateUrl: 'templates/timeline.html',
    controller: 'TimelineController',
    title: 'Timeline'
  });
  $routeProvider.when('/search', {
    templateUrl: 'templates/search.html',
    controller: 'SearchController',
    controllerAs: 'searchController',
    title: 'Rechercher'
  });
  $routeProvider.when('/kanji/:level', {
    templateUrl: 'templates/kanji.html',
    controller: 'KanjiController',
    controllerAs: 'kanjiController',
    title: 'Kanji'
  });
  $routeProvider
    .otherwise({
      templateUrl: CONFIG.toc.templateUrl,
      controller: 'TocController',
      title: 'Table des matières'
    });
}

function setTitle($rootScope, $route) {
  $rootScope.$on('$routeChangeSuccess', function () {
    //Change page title, based on Route information
    $rootScope.title = $route.current.title;
  });
}
