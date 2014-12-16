'use strict';

angular.module('nihongo', ['ngRoute','infinite-scroll','ngSanitize','pascalprecht.translate'])
  .config(['$routeProvider', 'CONFIG', function ($routeProvider, CONFIG) {

    _(CONFIG.categories).forEach(function (category) {
      _(category.pages).forEach(function (page) {
        var route = '/' + getSlug(category.title) + '/' + getSlug(page.title);
        $routeProvider.when(route, {
          templateUrl: 'templates/page.html',
          controller: 'PageController',
          title: page.title,
          resolve: {
            params:function() {
              return {
                url: category.dir + '/' + page.file
              };
            }
          }
        });
      });
    });
    $routeProvider.when('/timeline',{
      templateUrl:'templates/timeline.html',
      controller:'TimelineController',
      title: 'Timeline'
    });
    $routeProvider
      .otherwise({
        templateUrl: CONFIG.toc.templateUrl,
        controller: 'TocController',
        title: 'Table des matières'
      });
  }])
  .run(['$rootScope','$route',function($rootScope,$route){
    $rootScope.$on('$routeChangeSuccess', function(){
      //Change page title, based on Route information
      $rootScope.title = $route.current.title;
    });
  }]);