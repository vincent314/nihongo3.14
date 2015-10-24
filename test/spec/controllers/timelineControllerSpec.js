'use strict';

describe('Test TimelineController', function () {

  var $scope, CONFIG, $location, $rootScope, NihongoService, $httpBackend, $controller, pageGet, $http;

  beforeEach(function () {
    module('nihongo', function ($provide) {
      $provide.constant('CONFIG', {
        categories: [
          {
            title: 'CategoryA',
            dir: 'dir',
            pages: [
              {
                title: 'Page A',
                file: 'pageA.html'
              },
              {
                title: 'Page B',
                file: 'pageB.html'
              }
            ]
          }
        ],
        toc: {
          templateUrl: 'toc.html'
        }
      });
    });
  });


  beforeEach(inject(function (_$location_, _$rootScope_, _$controller_, _CONFIG_, _NihongoService_, _$httpBackend_, _$http_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    CONFIG = _CONFIG_;
    NihongoService = _NihongoService_;
    $httpBackend = _$httpBackend_;
    $controller = _$controller_;
    $http = _$http_;

    $httpBackend.whenGET('dir/pageA.html').respond('Page A content');
    $httpBackend.whenGET('toc.html').respond('Table of content');
    pageGet = $httpBackend.whenGET('dir/pageB.html');
    pageGet.respond('Page B content');
  }));

  afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }
  )
  ;

  var createController = function () {
    $scope = $rootScope.$new();

    var controller = $controller('TimelineController', {
      $scope: $scope,
      CONFIG: CONFIG,
      NihongoService: NihongoService
    });

    $httpBackend.flush();
    $scope.$digest();
    return controller;
  };


  it('should load timeline', function () {
    var controller = createController();

    // Test timeline structure
    expect(controller.timeline).toEqual([{
      title: 'Page B',
      file: 'pageB.html',
      category: {dir: 'dir'}
    }, {title: 'Page A', file: 'pageA.html', category: {dir: 'dir'}}]);

    expect($scope.pages).toEqual(['Page B content']);
  });

  it('should manage http error', inject(function () {
    // redefine response with 404 error
    pageGet.respond(404, 'Not found');

    spyOn(console, 'log');
    createController();
    expect($scope.pages.length).toBe(0);
    expect(console.log).toHaveBeenCalledWith('404 : Not found');
  }));

  it('should test paging function', function (done) {
    var controller = createController();
    spyOn(controller, 'printPage').and.callThrough();
    $scope.pagingFunction();
    $httpBackend.flush();

    done();
    expect($scope.pages).toEqual(['Page B content', 'Page A content']);
    expect(controller.printPage.callCount).toBe(1);
    expect(controller.printPage).toHaveBeenCalledWith(1);
  });

  it('should get http request content with promises', function (done) {
    var content, error;

    $http.get('dir/pageA.html').success(function (data) {
      console.log(data);
      content = data;
    }).error(function () {
      console.log(error);
    });

    $httpBackend.flush();

    done();

    expect(content).toBe('Page A content');
  });

  it('should test the end of the timeline', function (done) {
    createController();

    // call more than 2 times
    $scope.pagingFunction();
    $scope.pagingFunction();
    $scope.pagingFunction();
    $scope.pagingFunction();

    $httpBackend.flush();
    done();

    expect($scope.pages).toEqual(['Page B content', 'Page A content']);
  });
});
