'use strict';

describe('Test page controller', function () {

    var $scope,CONFIG,$location,$rootScope;

    beforeEach(function() {
        module('nihongo', function ($provide,CONFIG){
            $provide.constant('CONFIG', CONFIG);
        });
    });


    beforeEach(inject(function (_$location_,_$rootScope_,_$controller_,_CONFIG_) {
        $rootScope = _$rootScope_;
        $location = _$location_;
        CONFIG = _CONFIG_;

    }));

    it('Should previous link available',inject(function($controller){
        $location.path('/category1/page-2');
        $rootScope.$apply();
        $scope = $rootScope.$new();

        $controller('PageController',{
            $scope:$scope,
            CONFIG:CONFIG
        });
        $scope.$digest();
        expect($scope.previous).toBeDefined();
        expect($scope.previous.path).toBe('#/category1/page-1');
        expect($scope.next).toBeUndefined();
    }));

    it('Should previous link unavailable',inject(function($controller){
        $location.path('/category1/page-1');
        $rootScope.$apply();
        $scope = $rootScope.$new();
        $controller('PageController',{
            $scope:$scope,
            CONFIG:CONFIG
        });
        $scope.$digest();
        expect($scope.previous).toBeUndefined();
        expect($scope.next.path).toBe('#/category1/page-2');
    }));
});