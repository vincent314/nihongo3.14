'use strict';

require('../config');

var NihongoService = function (CONFIG, $resource,$http,$q) {
  this.CONFIG = CONFIG;
  this.$resource = $resource;
  this.$http = $http;
  this.$q = $q;
};

/**
 *
 */
NihongoService.prototype.buildRoute = function (categoryTitle, pageTitle) {
  return '#/' + getSlug(categoryTitle) + '/' + getSlug(pageTitle);
};

/**
 */
NihongoService.prototype.buildTimeline = function (categories) {
  return _.chain(categories)
    .map(function (category) {
      var pages = category.pages;
      _(pages).each(function (page) {
        page.category = {
          dir: category.dir
        };
      });
      return pages;
    })
    .flatten()
    .reverse()
    .value();
};

/**
 *
 * @param searchString
 * @returns {*}
 */
NihongoService.prototype.search = function (searchString) {
  var resource = this.$resource('http://' + this.CONFIG.es.host + ':' + this.CONFIG.es.port + '/' + this.CONFIG.es.uri + '/_search');

  return resource.get({q: ('japanese:' + searchString + ' OR french:' + searchString)}).$promise;
};

NihongoService.prototype.getKanjiList = function (file) {
  return this.$http.get(this.CONFIG.kanji.base + '/' + file).then(function (res) {
    return res.data;
  });
};

NihongoService.$inject = ['CONFIG', '$resource','$http','$q'];
module.exports = angular.module('nihongo').service('NihongoService', NihongoService);
