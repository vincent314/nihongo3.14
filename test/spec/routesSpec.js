describe("Test routes over configuration", function () {

    var $location, $route, $rootScope;

    beforeEach( function(){
        module('nihongo',function ($provide) {
            $provide.constant('CONFIG', {
                categories: [
                    {
                        title: "Category1",
                        dir: "dir/",
                        pages: [
                            {title: 'Page 1',
                                file: 'page1.html'},
                            {title: 'Page 2',
                                file: 'page2.html'}
                        ]
                    }
                ]
            });
        });
        inject(function (_$location_, _$route_, _$rootScope_) {
            $location = _$location_;
            $route = _$route_;
            $rootScope = _$rootScope_;
        });
    });


    it("test config injection", inject(function (CONFIG) {
        expect(CONFIG.categories[0].title).toBe('Category1');
    }));

    it("test page routing", function () {

    });
});