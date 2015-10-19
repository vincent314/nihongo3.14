'use strict';

var getSlug = require('speakingurl');

module.exports = 'nihongo.ctrl.toc';
angular.module(module.exports, [
  require('../config')
])
  .controller('TocController', ['$scope', 'CONFIG', function ($scope, CONFIG) {
    $scope.categories = CONFIG.categories;
    $scope.buildRoute = function (categoryTitle, pageTitle) {
      return '#/' + getSlug(categoryTitle) + '/' + getSlug(pageTitle);
    };
  }]);
