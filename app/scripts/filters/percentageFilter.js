'use strict';
module.exports = 'nihongo.filter.percentage';
angular.module(module.exports, []).filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);
