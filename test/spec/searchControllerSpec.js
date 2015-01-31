'use strict';

describe('Test Search Controller', function () {
  var $controller, $rootScope, $httpBackend;

  var mock = {
    hits: {
      total: 42,
      hits: [{
        _index: 'nihongo',
        _type: 'article',
        '_id': '17',
        '_score': 0.08762917,
        '_source': {'category': '1ère année 2011-2012', 'page': 'Cours 10', 'uri': '#/1ere-annee-2011-2012/cours-10'}
      }]
    }
  };

  beforeEach(function () {
    module('nihongo');

    inject(['$rootScope', '$controller', '$httpBackend', function (_$rootScope_, _$controller_, _$httpBackend_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
    }]);
  });


  it('Do search success', function () {
    $httpBackend.when('GET', 'toc.html').respond('');
    $httpBackend.when('GET', 'http://localhost:9200/nihongo/article/_search?q=japanese:kuruma+OR+french:kuruma')
      .respond(mock);

    var ctrl;
    runs(function () {
      ctrl = $controller('SearchController', {$routeParams: {searchString: 'kuruma'}});
      spyOn(ctrl, 'searchSuccess').andCallThrough();
      $httpBackend.flush();
    });

    waitsFor(function(){
      return ctrl.total;
    });
    runs(function () {
      expect(ctrl.searchSuccess).toHaveBeenCalled();
      expect(ctrl.total).toBe(42);
      expect(ctrl.hits).toEqual(mock.hits.hits);
    });
  });

  it('Do search failure', function () {
    $httpBackend.when('GET', 'toc.html').respond('');
    $httpBackend.when('GET', 'http://localhost:9200/nihongo/article/_search?q=japanese:kuruma+OR+french:kuruma')
      .respond(500);

    var ctrl;
    runs(function () {
      ctrl = $controller('SearchController', {$routeParams: {searchString: 'kuruma'}});
      $httpBackend.flush();
    });

    waitsFor(function(){
      return ctrl.error;
    });
    runs(function () {
      expect(ctrl.error.status).toBe(500);
      expect(ctrl.total).not.toBeDefined();
      expect(ctrl.hits).not.toBeDefined();
    });
  });

  it('No search string provided', function () {
    var ctrl;
    runs(function () {
      ctrl = $controller('SearchController', {$routeParams: {searchString: ''}});
    });

    waitsFor(function(){
      return ctrl.total !== undefined;
    });
    runs(function () {
      expect(ctrl.total).toBe(0);
      expect(ctrl.hits).toEqual([]);
    });
  });
});
