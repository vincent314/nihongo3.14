'use strict';
var KanjiController = function (NihongoService,$rootScope) {
  var self = this;

  NihongoService.getKanjiList('kanji_1.json').then(function (kanjiList) {
    self.kanjiList = kanjiList;
    self.kanjiMatrix = self.chunk(kanjiList, 6);
  }).catch(function(err){
    self.kanjiList = [];
    console.log(JSON.stringify(err));
  });

};

KanjiController.prototype.chunk = function (array, size) {
  var result = [];
  while(array.length) {
    result.push(array.splice(0, size))
  }
  return result;
};

KanjiController.$inject = ['NihongoService','$rootScope'];
angular.module('nihongo').controller('KanjiController', KanjiController);
