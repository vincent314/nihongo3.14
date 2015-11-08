///<reference path="global.d.ts"/>

import IRouteProvider = ng.route.IRouteProvider;
angular.module('nihongo', ['ngRoute', 'infinite-scroll', 'ngSanitize', 'pascalprecht.translate', 'ngResource', 'mgcrea.ngStrap.popover'])
  .config(NihongoModule)
  .run(['$rootScope', '$route', function ($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function () {
      //Change page title, based on Route information
      $rootScope.title = $route.current.title;
    });
  }]);


"ngInject";
function NihongoModule($routeProvider:IRouteProvider, CONFIG) {
  _(CONFIG.categories).forEach(function (category) {
    _(category.pages).forEach(function (page) {
      var route = '/' + getSlug(category.title) + '/' + getSlug(page.title);
      $routeProvider.when(route, {
        templateUrl: 'templates/page.html',
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
