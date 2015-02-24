'use strict';
var KanjiController = function ($scope,NihongoService) {

  NihongoService.getKanjiList().then(function (kanjiList) {
    $scope.kanjiList = kanjiList;
  }).catch(function(err){
    $scope.kanjiList = [];
    console.log(JSON.stringify(err));
  });

};

KanjiController.$inject = ['$scope','NihongoService'];
angular.module('nihongo').controller('KanjiController', KanjiController);
