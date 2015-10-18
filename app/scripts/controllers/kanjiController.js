'use strict';
var KanjiController = function (NihongoService,$routeParams) {
  var self = this;
  var level = $routeParams.level;

  NihongoService.getKanjiList('kanji_' + level + '.json').then(function (kanjiList) {
    self.kanjiMatrix = self.chunk(_.sortBy(kanjiList,'id'), 6);
  }).catch(function(err){
    self.kanjiMatrix = [];
    console.log(JSON.stringify(err));
  });
};

KanjiController.prototype.chunk = function (array, size) {
  var result = [];
  while(array.length) {
    result.push(array.splice(0, size));
  }
  return result;
};

KanjiController.$inject = ['NihongoService','$routeParams'];
module.exports = angular.module('nihongo').controller('KanjiController', KanjiController);
