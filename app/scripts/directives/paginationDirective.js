'use strict';

angular.module('nihongo').directive('pagination',function(){
    return {
        templateUrl:'templates/pagination.html',
        scope:{
            previous:'=previous',
            next:'=next'
        }

    };
});