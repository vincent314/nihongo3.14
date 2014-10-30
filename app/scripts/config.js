"use strict";

angular.module('nihongo.config',[]).constant('CONFIG', {
    categories:{
        title: "2014-2015",
        dir:"pages/2014/",
        pages: [
            {title: 'Page 1',
                category: '',
                file: 'page1.html'},
            {title: 'Page 2',
                route: '#page2',
                file: 'page2.html'}
        ]
    }

});