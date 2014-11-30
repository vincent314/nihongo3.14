'use strict';
angular.module('nihongo').service('NihongoService', function () {

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

  return NihongoService;
});
