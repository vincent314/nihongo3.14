///<reference path="../_App.ts"/>
module controllers {
  angular.module('nihongo').controller('PageController', ['$scope', '$location', 'CONFIG', 'NihongoService', 'params', function ($scope, $location, CONFIG, NihongoService, params) {
    var currentPath = '#' + $location.path();
    var pagesFlatten = [];
    _(CONFIG.categories).forEach(function (category) {
      _(category.pages).forEach(function (page) {
        var path = NihongoService.buildRoute(category.title, page.title, true);
        pagesFlatten.push({
          path: path,
          page: page,
          category: category
        });
      });
    });

    var i = _(pagesFlatten).findIndex(function (item) {
      return currentPath === item.path;
    });

    if (i > 0) {
      $scope.previous = pagesFlatten[i - 1];
    }
    if (i < pagesFlatten.length - 1) {
      $scope.next = pagesFlatten[i + 1];
    }

    $scope.url = params.url;
  }]);
}
