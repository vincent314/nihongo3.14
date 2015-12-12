'use strict';

describe('Test headerController', function () {
  var $controller,$scope,$translate,$location;

  beforeEach(function(){
    module('nihongo');

    inject(['$controller','$rootScope', '$translate', '$location', function (_$controller_,$rootScope,_$translate_,_$location_) {
      $controller = _$controller_;
      $scope = $rootScope.$new();
      $translate = _$translate_;
      $location = _$location_;

      $controller('HeaderController', {
        $scope: $scope
      });

      spyOn($translate,'use');
    }]);
  });

  it('Test switch lang', function () {
    expect($scope.switchLang).toBeDefined();

    $scope.switchLang('jp');
    expect($translate.use).toHaveBeenCalledWith('jp');
  });

  it('Test search', function () {
    $scope.searchString = 'search value';
    $scope.search();

    expect($location.path()).toBe('/search');
    expect($location.search()).toEqual({ searchString : 'search value' });
  });
});
