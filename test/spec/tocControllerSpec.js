'use strict';

describe('Test TOC controller', function () {

  var scope, CONFIG;

  beforeEach(function () {
    module('nihongo', function ($provide, CONFIG) {
      $provide.value('CONFIG', CONFIG);
    });
  });

  beforeEach(inject(function ($rootScope, $controller, _CONFIG_) {
    scope = $rootScope.$new();
    CONFIG = _CONFIG_;
    $controller('TocController', {
      $scope: scope,
      CONFIG: CONFIG
    });
    scope.$digest();
  }));

  it('Should mock CONFIG be injected', function () {
    expect(CONFIG.categories).toBeDefined();
    expect(CONFIG.categories[0].pages).toBeDefined();
    expect(CONFIG.categories[0].pages[0].title).toBe('Page 1');
  });

  it('Should get pages list', function () {
    expect(scope.categories).toBeDefined();
    expect(scope.categories.length).toBe(2);
    expect(scope.categories[0].pages.length).toBe(2);
  });

  it('Should build page route', function () {
    expect(scope.buildRoute('Category 1', 'Page 1')).toBe('#/category-1/page-1');
  });

  it('Should get latest pages', function () {
    expect(scope.latest).toBeDefined();
    expect(scope.latest.length).toBe(3);
    expect(scope.latest[0].title).toBe('Page B');
    expect(scope.latest[1].title).toBe('Page A');
    expect(scope.latest[2].title).toBe('Page 2');

  });
});
