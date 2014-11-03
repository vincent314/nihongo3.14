'use strict';

angular.module('nihongo').constant('CONFIG', {
    categories: [
        {
            title: '3ème année 2013-2014',
            dir: 'docs/html/Cours_3annee',
            pages: [
                {title: 'Cours 1',
                    file: 'cours_1.html'
                },
                {title: 'Cours 2',
                    file: 'cours_2.html'},
                {title: 'Cours 3',
                    file: 'cours_3.html'},
                {title: 'Cours 4',
                    file: 'cours_4.html'},
                {title: 'Cours 5',
                    file: 'cours_5.html'}
            ]
        },
        {
            title: '3ème année 2014-2015',
            dir: 'docs/html/Cours_3b',
            pages: [
                {title: 'Cours 1',
                    file: 'cours_01.html'},
                {title: 'Les Furigana',
                    file: 'furigana.html'},
                {title: 'Cours 2',
                    file: 'cours_02.html'}
            ]
        }
    ],
    toc: {
        templateUrl: 'toc.html'
    }
});