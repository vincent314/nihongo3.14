"use strict";

angular.module('nihongo.controllers',[]).controller("TocController",function($scope,CONFIG){
    $scope.pages = CONFIG.pages;
});