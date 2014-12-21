'use strict';

describe('Test TimelineController', function () {

  var $scope, CONFIG, $location, $rootScope, NihongoService, $httpBackend, $controller, pageGet, $http;

  beforeEach(function () {
    module('templates');
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
    runs(function() {
      createController();
    });

    runs(function() {
      expect($scope.pages.length).toBe(0);
      expect(console.log).toHaveBeenCalledWith('404 : Not found');
    });
  }));

  it('should test paging function', function () {
    var controller, content;

    runs(function () {
      controller = createController();
      spyOn(controller, 'printPage').andCallThrough();
      $scope.pagingFunction();
      $httpBackend.flush();
    });

    runs(function () {
      expect($scope.pages).toEqual(['Page B content', 'Page A content']);
      expect(controller.printPage.callCount).toBe(1);
      expect(controller.printPage).toHaveBeenCalledWith(1);
    });
  });

  it('should get http request content with promises', function () {
    var content,error;

    $http.get('dir/pageA.html').success(function (data, status) {
      console.log(data);
      content = data;
    }).error(function (status) {
      console.log(error);
    });

    $httpBackend.flush();

    runs(function () {
      expect(content).toBe('Page A content');
    });
  });

  it('should test the end of the timeline', function () {
    var controller = createController();

    // call more than 2 times
    $scope.pagingFunction();
    $scope.pagingFunction();
    $scope.pagingFunction();
    $scope.pagingFunction();

    $httpBackend.flush();

    runs(function(){
      expect($scope.pages).toEqual(['Page B content', 'Page A content']);
    })
  });
});
