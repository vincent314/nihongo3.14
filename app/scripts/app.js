'use strict';

angular.module('nihongo', ['ngRoute'])
  .config(['$routeProvider', 'CONFIG', function ($routeProvider, CONFIG) {

    _(CONFIG.categories).forEach(function (category) {
      _(category.pages).forEach(function (page) {
        var route = '/' + getSlug(category.title) + '/' + getSlug(page.title);
        $routeProvider.when(route, {
          templateUrl: category.dir + '/' + page.file,
          controller: 'PageController',
          title: page.title
        });
      });
    });
    $routeProvider
      .otherwise({
        templateUrl: CONFIG.toc.templateUrl,
        controller: 'TocController',
        title: 'Table des matières'
      });
  }])
  .run(['$rootScope','$route',function($rootScope,$route){
    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute){
      //Change page title, based on Route information
      $rootScope.title = $route.current.title;
    });
  }]);
