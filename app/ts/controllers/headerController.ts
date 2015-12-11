///<reference path="../lib.d.ts"/>
angular.module('nihongo').controller('HeaderController',['$scope','$translate','$location',function($scope,$translate,$location) {
  $scope.switchLang= function(lang) {
    $translate.use(lang);
  };

  $scope.search = function() {
    $location.path('/search').search('searchString', $scope.searchString);
  };
}]);
