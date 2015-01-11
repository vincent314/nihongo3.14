'use strict';

angular.module('nihongo').controller('SearchController', ['$scope','$routeParams','NihongoService',function ($scope,$routeParams,NihongoService){
  var searchString = $routeParams.searchString;

  NihongoService.search(searchString).then(function(result) {
    $scope.total = result.hits.total;
    $scope.hits = result.hits.hits;
  }).catch(function(err) {
    $scope.error = err;
  });
}]);
