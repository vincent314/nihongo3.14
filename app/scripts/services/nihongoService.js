'use strict';
angular.module('nihongo').service('NihongoService', function () {

    var NihongoService = function () {
    };


    NihongoService.prototype.buildRoute = function (categoryTitle, pageTitle) {
        return '#/'+ getSlug(categoryTitle) + '/' + getSlug(pageTitle);
    };

    return NihongoService;
});