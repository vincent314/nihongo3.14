'use strict';
angular.module('nihongo').service('NihongoService', ['CONFIG','$resource',function (CONFIG,$resource) {

  var NihongoService = {};

  /**
   *
   */
  NihongoService.buildRoute = function (categoryTitle, pageTitle) {
    return '#/' + getSlug(categoryTitle) + '/' + getSlug(pageTitle);
  };

  /**
   */
  NihongoService.buildTimeline = function (categories) {
    return _.chain(categories)
      .map(function (category) {
        var pages = category.pages;
        _(pages).each(function(page){
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
  NihongoService.search = function(searchString){
    var resource = $resource('http://' + CONFIG.es.host + ':' + CONFIG.es.port + '/' + CONFIG.es.uri + '/_search');

    return resource.get({q:('japanese:' + searchString + ' OR french:' + searchString)}).$promise;
  };

  return NihongoService;
}]);
