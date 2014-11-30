'use strict';

describe('Test Nihongo Service', function () {

  beforeEach(module('nihongo'));

  it('Should build route with hash', inject(function (NihongoService) {
    var route = NihongoService.buildRoute('Category 1', 'Page 1');
    expect(route).toBe('#/category-1/page-1');
  }));

  it('Should build timeline', inject(function (NihongoService, CONFIG) {
    // WHEN
    var timeline = NihongoService.buildTimeline(CONFIG.categories);

    var expected = [
      {title: 'Page B', file: 'pageB.html',category:{dir:'dir'}},
      {title: 'Page A', file: 'pageA.html',category:{dir:'dir'}},
      {title: 'Page 2', file: 'page2.html',category:{dir:'dir'}},
      {title: 'Page 1', file: 'page1.html',category:{dir:'dir'}}];
    expect(timeline).toEqual(expected);
  }));

});
