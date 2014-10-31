angular.module('nihongo.config', []).constant('CONFIG_TEST', {
    categories: [
        {
            title: "Category1",
            dir: "dir",
            pages: [
                {title: 'Page 1',
                    file: 'page1.html'},
                {title: 'Page 2',
                    file: 'page2.html'}
            ]
        }
    ],
    toc: {
        templateUrl: 'tocTemplate.html'
    }
});