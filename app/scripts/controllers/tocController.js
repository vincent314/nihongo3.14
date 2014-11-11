'use strict';

angular.module('nihongo').controller('TocController', ['$scope', 'CONFIG', '$rootScope', function ($scope, CONFIG, $rootScope) {
  $scope.categories = CONFIG.categories;
  delete $rootScope.previous;
  delete $rootScope.next;
  $scope.buildRoute = function (categoryTitle, pageTitle) {
    return '#/' + getSlug(categoryTitle) + '/' + getSlug(pageTitle);
  };
}]);
