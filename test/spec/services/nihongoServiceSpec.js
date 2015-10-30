'use strict';

describe('Test Nihongo Service', function () {
  var NihongoService, CONFIG, $httpBackend;


  beforeEach(module('nihongo'));
  beforeEach(inject(function (_NihongoService_, _CONFIG_, _$httpBackend_) {
    NihongoService = _NihongoService_;
    CONFIG = _CONFIG_;
    $httpBackend = _$httpBackend_;
  }));

  it('Should build route with hash', function () {
    var route = NihongoService.buildRoute('Category 1', 'Page 1');
    expect(route).toBe('#/category-1/page-1');
  });

  it('Should build timeline', function () {
    // WHEN
    var timeline = NihongoService.buildTimeline(CONFIG.categories);

    var expected = [
      {title: 'Page B', file: 'pageB.html', category: {dir: 'dir'}},
      {title: 'Page A', file: 'pageA.html', category: {dir: 'dir'}},
      {title: 'Page 2', file: 'page2.html', category: {dir: 'dir'}},
      {title: 'Page 1', file: 'page1.html', category: {dir: 'dir'},topics : [ '一番', '二番' ]}];
    expect(timeline).toEqual(expected);
  });

  it('Should do a search', function (done) {
    $httpBackend.when('GET', 'toc.html').respond('');
    $httpBackend.when('GET', 'http://localhost:9200/nihongo/article/_search?q=japanese:sample+OR+french:sample').respond({toto: 'titi'});

      NihongoService.search('sample').then(function (r) {
        expect(r.toto).toBe('titi');
        done();
      }).catch(function (err) {
        done(err);
      });
      $httpBackend.flush();
  });

  it('SHould be fals', function () {
    expect(true).toBe(false);
  });
});
