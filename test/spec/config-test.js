angular.module('nihongo').constant('CONFIG', {
    categories: [
        {
            title: 'Category1',
            dir: 'dir',
            pages: [
                {title: 'Page 1',
                    file: 'page1.html'},
                {title: 'Page 2',
                    file: 'page2.html'}
            ]
        },
        {
            title: 'CategoryA',
            dir: 'dir',
            pages: [
                {title: 'Page A',
                    file: 'pageA.html'},
                {title: 'Page B',
                    file: 'pageB.html'}
            ]
        }
    ],
    toc: {
        templateUrl: 'tocTemplate.html'
    }
});
