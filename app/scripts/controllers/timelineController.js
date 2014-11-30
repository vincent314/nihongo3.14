'use strict';

angular.module('nihongo').controller('TimelineController',
  ['$scope', 'CONFIG', 'NihongoService', '$http', '$sanitize',
    function ($scope, CONFIG, NihongoService, $http, $sanitize) {
      var timeline = NihongoService.buildTimeline(CONFIG.categories);
      var currentIndex = 0;
      $scope.pages = [];


      function printPage(idx) {
        var page = timeline[idx];
        console.log(page.category.dir + '/' + page.file);
        $http.get(page.category.dir + '/' + page.file)
          .success(function (content) {
            $scope.pages.push($sanitize(content));
          })
          .error(function (data, status) {
            console.log(status);
            console.log(data);
          });
      }

      printPage(currentIndex);

      $scope.pagingFunction = function () {
        if (currentIndex < timeline.length - 1) {
          currentIndex++;
          printPage(currentIndex);
        }
      };

    }]);
