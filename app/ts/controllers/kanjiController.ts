///<reference path="../lib.d.ts"/>
function KanjiController($routeParams, NihongoService) {
  var self = this;
  var vm = this;
  vm.showKanji = showKanji;
  vm.isKatakana = isKatakana;
  vm.level = $routeParams.level;


  NihongoService.getKanjiList('kanjis.json').then(function (kanjiList) {
    vm.charList = _.pluck(kanjiList, 'kanji');
    self.kanjiIndex = _.indexBy(kanjiList, 'kanji');
  }).catch(function (err) {
    console.log(JSON.stringify(err));
  });

  function showKanji(char) {
    vm.kanji = self.kanjiIndex[char];
  }

  function isKatakana(reading) {
    if (!reading) {
      return false;
    }
    var firstCode = reading.charCodeAt(0);
    return firstCode >= 0x30A0 && firstCode <= 0x30FF;
  }
}

KanjiController.$inject = ['$routeParams', 'NihongoService'];
angular.module('nihongo').controller('KanjiController', KanjiController);
