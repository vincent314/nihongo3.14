'use strict';

angular.module('nihongo').controller('TocController', ['$scope', 'CONFIG', function ($scope, CONFIG) {
  $scope.categories = CONFIG.categories;
  $scope.kanji = CONFIG.kanji;
  $scope.buildRoute = function (categoryTitle, pageTitle) {
    return '#/' + getSlug(categoryTitle) + '/' + getSlug(pageTitle);
  };
}]);
