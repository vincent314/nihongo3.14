'use strict';
module.exports = 'nihongo.directives.pagination';
angular.module(module.exports, []).directive('pagination', function () {
  return {
    templateUrl: 'templates/pagination.html',
    scope: {
      previous: '=previous',
      next: '=next'
    }

  };
});
