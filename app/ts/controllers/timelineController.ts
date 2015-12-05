'use strict';

/**
 *
 *
 * @param $scope
 * @param CONFIG
 * @param NihongoService
 * @param $http
 * @param $sanitize
 * @constructor
 */
function TimelineController($scope, CONFIG, NihongoService, $http, $sanitize, $q) {
  var self = this;
  self.$http = $http;
  self.$sanitize = $sanitize;
  self.$scope = $scope;
  self.$q = $q;
  self.currentIndex = 0;

  $scope.pages = [];
  self.timeline = NihongoService.buildTimeline(CONFIG.categories);

  self.printPage(self.currentIndex);

  $scope.pagingFunction = function () {
    if (self.currentIndex < self.timeline.length - 1) {
      self.currentIndex++;
      self.printPage(self.currentIndex);
    }
  };
}

angular.module('nihongo').controller('TimelineController',
  ['$scope', 'CONFIG', 'NihongoService', '$http', '$sanitize', '$q',
    TimelineController]);

/**
 * Get HTML file content and add the content to the stream
 *
 * @param idx
 */
TimelineController.prototype.printPage = function (idx) {
  var self = this;
  var page = this.timeline[idx];
  return this.$http.get(page.category.dir + '/' + page.file)
    .then(
    function (response) {
      self.$scope.pages.push(self.$sanitize(response.data));
      return response.data;
    }).catch(function (response) {
      var msg = response.status + ' : ' + response.data;
      console.log(msg);
    });
};
