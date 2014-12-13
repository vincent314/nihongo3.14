'use strict';

angular.module('nihongo').config(['$translateProvider',function($translateProvider) {
  $translateProvider.translations('fr',{
    'HOME':'Accueil',
    'LAST_LESSONS':'Derniers cours',
    'DOWNLOADS':'Téléchargements',
    'LESSONS_YEAR_1':'Cours 1ère année 2011/2012',
    'LESSONS_YEAR_2':'Cours 2ème année 2012/2013',
    'LESSONS_YEAR_3A':'Cours 3ème année 2013/2014',
    'LESSONS_YEAR_3B':'Cours 3ème année 2014/2015',
    'LINKS':'Liens',
    'LESSONS_MANUAL':'Supports de cours',
    'YEAR_3':'3ième année',
    'ALL':'Tous'
  });
  $translateProvider.preferredLanguage('fr');
}]);
