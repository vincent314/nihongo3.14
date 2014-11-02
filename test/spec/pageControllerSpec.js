'use strict';

describe('Test page controller', function () {

    beforeEach(function() {
        module('nihongo', function ($provide,CONFIG_TEST){
            $provide.constant('CONFIG', CONFIG_TEST);
        });
    });

    beforeEach(inject(function($controller){
        $controller('')
    }))



});