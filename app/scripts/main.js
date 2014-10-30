"use strict";

angular.module('nihongo', ['ngRoute','nihongo.controllers','nihongo.config'])
    .config(function ($routeProvider,CONFIG) {
        $routeProvider
            .when('/page1', {
                templateUrl: 'pages/page1.html'
            })
            .otherwise({
                templateUrl: 'pages/toc.html',
                controller:'TocController'
            });
    });
