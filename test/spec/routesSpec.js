'use strict';

describe('Test routes over configuration', function () {

    var $location, $route, $rootScope;

    beforeEach( function(){
        module('nihongo',function ($provide,CONFIG){
            $provide.constant('CONFIG', CONFIG);
        });

        inject(function (_$location_, _$route_, _$rootScope_) {
            $location = _$location_;
            $route = _$route_;
            $rootScope = _$rootScope_;
        });
    });


    it('test config injection', inject(function (CONFIG) {
        expect(CONFIG.categories[0].title).toBe('Category1');
    }));

    it('test page routing', function () {
        expect($route.routes['/category1/page-1'].templateUrl).toEqual('dir/page1.html');
        expect($route.routes['/category1/page-2'].templateUrl).toEqual('dir/page2.html');
        expect($route.routes[null].templateUrl).toEqual('tocTemplate.html');
    });
});