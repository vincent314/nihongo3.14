///<reference path="../lib.d.ts"/>
angular.module('nihongo').controller('TocController', ['$scope', 'CONFIG', function ($scope, CONFIG) {
  $scope.categories = CONFIG.categories;
  $scope.kanji = CONFIG.kanji;
  $scope.buildRoute = function (categoryTitle, pageTitle) {
    return '#/' + window.getSlug(categoryTitle) + '/' + window.getSlug(pageTitle);
  };
}]);
