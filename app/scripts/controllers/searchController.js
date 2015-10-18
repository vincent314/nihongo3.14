'use strict';
var SearchController = function ($routeParams, NihongoService) {
    var self = this;
    var searchString = $routeParams.searchString;

    if (!searchString) {
      this.total = 0;
      this.hits = [];
    } else {
      NihongoService.search(searchString).then(function (result) {
        self.searchSuccess(result);
      }).catch(function (err) {
        self.searchFailure(err);
      });
    }
  };

SearchController.prototype.searchSuccess = function (result) {
  this.total = result.hits.total;
  this.hits = result.hits.hits;
};

SearchController.prototype.searchFailure = function (err) {
  this.error = err;
  console.log('Error status : ' + err.status);
};

SearchController.$inject = ['$routeParams', 'NihongoService'];

module.exports = angular.module('nihongo').controller('SearchController', SearchController);
