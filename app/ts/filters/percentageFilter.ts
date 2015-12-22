///<reference path="../_App.ts"/>
module filters {
  angular.module('nihongo').filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
      return $filter('number')(input * 100, decimals) + '%';
    };
  }]);
}
