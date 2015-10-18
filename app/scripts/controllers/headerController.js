'use strict';

require('../translate');

module.exports = 'nihongo.ctrl.header';
angular.module('nihongo.ctrl.header',[]).controller('HeaderController',['$scope','$translate','$location',function($scope,$translate,$location) {
  $scope.switchLang= function(lang) {
    $translate.use(lang);
  };

  $scope.search = function() {
    $location.path('/search').search('searchString', $scope.searchString);
  };
}]);
