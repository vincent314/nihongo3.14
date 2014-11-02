'use strict';

angular.module('nihongo').controller('PageController',function($scope,$location,CONFIG){
    console.log($location.path());

    var currentPath = "#" + $location.path();
    var pagesFlatten = [];
    _(CONFIG.categories).forEach(function(category){
        _(category.pages).forEach(function(page){
            var path = "#/" + getSlug(category.title) + "/" + getSlug(page.title);
            pagesFlatten.push({
                path:path,
                page:page,
                category:category
            });
        });
    });

    var i = _(pagesFlatten).findIndex(function(item){
        console.log(currentPath + " ===?" + item.path);
        return currentPath === item.path;
    });

    if(i>=0){
        if(i > 0){
            $scope.previous = pagesFlatten[i-1];
        }
        if(i<pagesFlatten.length-1){
            $scope.next = pagesFlatten[i+1];
        }
    };
});
