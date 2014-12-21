'use strict';

describe('Test headerController', function () {
  var $controller,$scope,$translate;

  beforeEach(function(){
    module('nihongo');

    inject(['$controller','$rootScope', '$translate', function (_$controller_,$rootScope,_$translate_) {
      $controller = _$controller_;
      $scope = $rootScope.$new();
      $translate = _$translate_;

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
});
