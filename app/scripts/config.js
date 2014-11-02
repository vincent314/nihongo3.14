'use strict';

angular.module('nihongo').constant('CONFIG', {
    categories: [
        {
            title: '2014-2015',
            dir: 'pages/2014/',
            pages: [
                {title: 'Page 1',
                    file: 'page1.html'},
                {title: 'Page 2',
                    file: 'page2.html'}
            ]
        },
        {
            title: 'Test',
            dir: 'pages/test/',
            pages: [
                {title: 'page test',
                    file: 'test.html'
                },
                {title: 'page test2',
                    file: 'test2.html'}
            ]
        }
    ],
    toc: {
        templateUrl: 'pages/toc.html'
    }
});