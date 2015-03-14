'use strict';
describe('Test KanjiController', function () {
  var $controller, $scope, $httpBackend, NihongoService;

  var KANJI_MOCK = [{
    "id": 1,
    "char": "一",
    "readings": {
      "onyomi": ["イチ", "イツ"],
      "kunyomi": ["ひと", "ひと", "かず", "い", "いっ", "いる", "かつ", "かづ", "てん", "はじめ", "ひ", "ひとつ", "まこと"]
    },
    "meanings": ["one"]
  }
    , {
      "id": 38,
      "char": "右",
      "readings": {"onyomi": ["ウ", "ユウ"], "kunyomi": ["みぎ", "あき", "すけ"]},
      "meanings": ["right"]
    }];

    beforeEach(function () {
    module('nihongo');

    inject(['$controller', '$rootScope', '$httpBackend', 'NihongoService', function (_$controller_, _$rootScope_, _$httpBackend_, _NihongoService_) {
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;
      NihongoService = _NihongoService_;
    }]);
    spyOn(NihongoService, 'getKanjiList').andCallThrough();
  });

  it('Test listing kanji success', function () {
    var ctrl;
    $httpBackend.when('GET', 'toc.html').respond('');
    $httpBackend.when('GET', 'docs/kanji/kanji_1.json').respond(200, KANJI_MOCK);

    runs(function () {
      ctrl = $controller('KanjiController', {
        $scope: $scope
      });
      $httpBackend.flush();
    });

    //waits(0);
    waitsFor(function () {
      return ctrl.kanjiMatrix;
    });
    runs(function () {
      expect(ctrl.kanjiMatrix.length).toBe(1);
      expect(ctrl.kanjiMatrix[0].length).toBe(2);
      expect(NihongoService.getKanjiList).toHaveBeenCalledWith('kanji_1.json');
    });
  });

  it('Test listing kanji error', function () {
    var ctrl;
    $httpBackend.when('GET', 'toc.html').respond('');
    $httpBackend.when('GET', 'docs/kanji/kanji_1.json').respond(500);

    runs(function () {
      ctrl = $controller('KanjiController', {
        $scope: $scope
      });
      $httpBackend.flush();
    });

    waitsFor(function () {
      return ctrl.kanjiMatrix;
    });
    runs(function () {
      expect(ctrl.kanjiMatrix).toEqual([]);
      expect(NihongoService.getKanjiList).toHaveBeenCalledWith('kanji_1.json');
    });
  });
});
