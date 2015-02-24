angular.module('nihongo').constant('CONFIG', {
  es: {
    host: 'localhost',
    port: '9200',
    uri: 'nihongo/article'
  },
  categories: [
    {
      title: 'Category1',
      dir: 'dir',
      pages: [
        {
          title: 'Page 1',
          file: 'page1.html',
          topics:['一番','二番']
        },
        {
          title: 'Page 2',
          file: 'page2.html'
        }
      ]
    },
    {
      title: 'CategoryA',
      dir: 'dir',
      pages: [
        {
          title: 'Page A',
          file: 'pageA.html'
        },
        {
          title: 'Page B',
          file: 'pageB.html'
        }
      ]
    }
  ],
  toc: {
    templateUrl: 'toc.html'
  },
  kanji:{
    file:'/kanji.json'
  }
});
