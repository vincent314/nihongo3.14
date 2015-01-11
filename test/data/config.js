'use strict';

angular.module('nihongo').constant('CONFIG', {
  categories: [
    {
      title: '1ère année 2011-2012',
      pdf: 'docs/pdf/Cours_japonais_1annee.pdf',
      dir: 'docs/html/Cours_1annee',
      pages: [
        {
          title: 'Cours 1',
          file: 'cours_1.html'
        },
        {
          title: 'Cours 3',
          file: 'cours_3.html'
        },
        {
          title: 'Cours 4',
          file: 'cours_4.html'
        }
      ]
    },
    {
      title: '2ème année 2012-1013',
      dir: 'docs/html/Cours_2annee',
      pdf: 'docs/pdf/Cours_japonais_2annee.pdf',
      epub: 'docs/epub/Cours de japonais niveau 2 2012-2013.epub',
      pages: [
        {
          title: 'Cours 1',
          file: 'cours_1.html'
        },
        {
          title: 'Cours 1 jours de la semaine',
          file: 'cours_1_jours_de_la_semaine.html'
        },
        {
          title: 'Cours 2',
          file: 'cours_2.html'
        }
      ]
    }
  ],
  toc: {
    templateUrl: 'toc.html'
  }
});
