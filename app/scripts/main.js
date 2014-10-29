'use strict';

angular.module('nihongo', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/page1', {
                templateUrl: 'pages/page1.html'
            })
            .otherwise({
                templateUrl: 'pages/toc.html',
                controller:'TocController'
            });
    });