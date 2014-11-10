'use strict';

angular.module('nihongo').controller('PageController',['$rootScope','$location','CONFIG','NihongoService',function($rootScope,$location,CONFIG,NihongoService){
    var currentPath = '#' + $location.path();
    var pagesFlatten = [];
    _(CONFIG.categories).forEach(function(category){
        _(category.pages).forEach(function(page){
            var path = new NihongoService().buildRoute(category.title,page.title,true);
            pagesFlatten.push({
                path:path,
                page:page,
                category:category
            });
        });
    });

    var i = _(pagesFlatten).findIndex(function(item){
        return currentPath === item.path;
    });

    if(i>=0){
        if(i > 0){
            $rootScope.previous = pagesFlatten[i-1];
        } else {
            delete $rootScope.previous;
        }
        if(i<pagesFlatten.length-1){
            $rootScope.next = pagesFlatten[i+1];
        } else {
            delete $rootScope.next;
        }
    }
}]);
