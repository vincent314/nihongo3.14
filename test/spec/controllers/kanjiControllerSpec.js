'use strict';
describe('Test KanjiController', function () {
  var $controller, $scope, $httpBackend, NihongoService;

  var KANJI_MOCK = [{
    'char': '一',
    'readings': [{'text': 'イチ', 'romaji': 'ICHI', 'type': 'onyomi'}, {
      'text': 'イツ',
      'romaji': 'ITSU',
      'type': 'onyomi'
    }, {'text': 'ひと', 'romaji': 'hito', 'type': 'kunyomi'}, {
      'text': 'ひと',
      'romaji': 'hito',
      'type': 'kunyomi'
    }, {'text': 'かず', 'romaji': 'kazu', 'type': 'kunyomi'}, {
      'text': 'い',
      'romaji': 'i',
      'type': 'kunyomi'
    }, {'text': 'いっ', 'romaji': 'itsu', 'type': 'kunyomi'}, {
      'text': 'いる',
      'romaji': 'iru',
      'type': 'kunyomi'
    }, {'text': 'まこと', 'romaji': 'makoto', 'type': 'kunyomi'}],
    'meanings': ['one']
  }, {
      'char': '右',
      'readings': [{'text': 'ウ', 'romaji': 'U', 'type': 'onyomi'}, {
        'text': 'ユウ',
        'romaji': 'YUU',
        'type': 'onyomi'
      }, {'text': 'みぎ', 'romaji': 'migi', 'type': 'kunyomi'}, {
        'text': 'あき',
        'romaji': 'aki',
        'type': 'kunyomi'
      }, {'text': 'すけ', 'romaji': 'suke', 'type': 'kunyomi'}],
      'meanings': ['right']
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

  it('Test listing kanji', function () {
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
});
