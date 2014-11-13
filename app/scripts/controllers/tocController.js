'use strict';

angular.module('nihongo').controller('TocController', ['$scope', 'CONFIG', '$rootScope', function ($scope, CONFIG, $rootScope) {
  $scope.categories = CONFIG.categories;
  $scope.latest = _.chain(CONFIG.categories)
    .map(function(category){return category.pages;})
    .flatten()
    .last(3)
    .reverse()
    .value();
  delete $rootScope.previous;
  delete $rootScope.next;
  $scope.buildRoute = function (categoryTitle, pageTitle) {
    return '#/' + getSlug(categoryTitle) + '/' + getSlug(pageTitle);
  };
}]);
