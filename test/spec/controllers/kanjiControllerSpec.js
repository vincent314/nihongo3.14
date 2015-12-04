'use strict';
describe('Test KanjiController', function () {
  var $controller, $scope, $httpBackend, NihongoService;

  var KANJI_MOCK = [
    {
      "kanji": "木",
      "meaning": "arbre, bois",
      "writing": "一｜ノ丶",
      "readings": [
        "ボク",
        "モク",
        "き",
        "こ"
      ],
      "vocabulary": [
        {
          "japanese": "大木",
          "reading": "たいぼく",
          "meaning": "grand arbre"
        },
        {
          "japanese": "木曜日",
          "reading": "もくようび",
          "meaning": "jeudi"
        },
        {
          "japanese": "木馬",
          "reading": "もくば",
          "meaning": "cariole"
        },
        {
          "japanese": "木立",
          "reading": "こだち",
          "meaning": "alignement des arbres"
        }
      ]
    }];

  beforeEach(function () {
    module('nihongo');

    inject(['$controller', '$rootScope', '$httpBackend', 'NihongoService', function (_$controller_, _$rootScope_, _$httpBackend_, _NihongoService_) {
      $controller = _$controller_;
      $scope = _$rootScope_.$new();
      $httpBackend = _$httpBackend_;
      NihongoService = _NihongoService_;
    }]);
    spyOn(NihongoService, 'getKanjiList').and.callThrough();

    $httpBackend.when('GET', 'toc.html').respond('');
    $httpBackend.when('GET', 'docs/kanji/kanjis.json').respond(200, KANJI_MOCK);
  });

  it('Test listing kanji success', function (done) {
    var ctrl = $controller('KanjiController', {
      $scope: $scope,
      $routeParams: {level: 1}
    });
    $httpBackend.flush();

    expect(ctrl.charList).toEqual(['木']);
    expect(NihongoService.getKanjiList).toHaveBeenCalledWith('kanjis.json');
    expect(ctrl.kanjiIndex['木']).toEqual(KANJI_MOCK[0]);
    done();
  });

  it('Test detecting katakana', function (done) {
    var ctrl = $controller('KanjiController', {
      $scope: $scope,
      $routeParams: {level: 1}
    });
    $httpBackend.flush();

    expect(ctrl.isKatakana('ア')).toBe(true);
    expect(ctrl.isKatakana('あ')).toBe(false);
    expect(ctrl.isKatakana('ン')).toBe(true);
    expect(ctrl.isKatakana('ん')).toBe(false);
    expect(ctrl.isKatakana('ワ')).toBe(true);
    expect(ctrl.isKatakana('わ')).toBe(false);
    done();
  });

});
