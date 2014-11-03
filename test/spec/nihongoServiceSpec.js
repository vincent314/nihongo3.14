'use strict';

describe('Test Nihongo Service',function(){

    beforeEach(module('nihongo'));

    it('Should build route with hash',inject(function(NihongoService){
        var route = new NihongoService().buildRoute('Category 1','Page 1');
        expect(route).toBe('#/category-1/page-1');
    }));

});