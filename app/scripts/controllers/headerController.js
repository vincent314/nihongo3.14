'use strict';

angular.module('nihongo').controller('HeaderController',['$scope','$translate',function($scope,$translate) {
  $scope.switchLang= function(lang) {
    $translate.use(lang);
  };
}]);
