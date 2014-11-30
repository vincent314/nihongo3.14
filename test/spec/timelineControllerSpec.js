'use strict';

describe('Test page controller', function () {

  var $scope, CONFIG, $location, $rootScope,NihongoService;

  beforeEach(function () {
    module('templates');
    module('nihongo', function ($provide, CONFIG) {
      $provide.constant('CONFIG', CONFIG);
    });
  });


  beforeEach(inject(function (_$location_, _$rootScope_, _$controller_, _CONFIG_,_NihongoService_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    CONFIG = _CONFIG_;
    NihongoService = _NihongoService_;
  }));

  it('should load timeline', inject(function ($controller,$httpBackend) {
    $httpBackend.whenGET('dir/pageB.html').respond('Page B content');

    $location.path('/timeline');
    $rootScope.$apply();
    $scope = $rootScope.$new();

    $controller('TimelineController', {
      $scope: $scope,
      CONFIG: CONFIG,
      NihongoService: NihongoService
    });

    $httpBackend.flush();
    $scope.$digest();

    expect($scope.pages).toEqual(['Page B content']);
  }));
});
