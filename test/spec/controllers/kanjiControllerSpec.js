'use strict';
describe('Test KanjiController', function () {
  var $controller, $scope, $httpBackend, NihongoService;

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
    var ctrl, response = [
      {
        id: 19,
        strokes: 3,
        kanji: '女',
        on: 'ジョ、ニョ、ニョオ',
        kun: 'おんな、め',
        english: 'woman, girl, daughter',
        kun2: '',
        english2: ''
      }];

    $httpBackend.when('GET', 'toc.html').respond('');
    $httpBackend.when('GET', '/kanji.json').respond(200, response);

    runs(function () {
      ctrl = $controller('KanjiController', {
        $scope: $scope
      });

      $httpBackend.flush();
    });

    waitsFor(function () {
      return $scope.kanjiList;
    });
    runs(function () {
      expect($scope.kanjiList).toEqual(response);
      expect(NihongoService.getKanjiList).toHaveBeenCalled();
    });
  });
});
