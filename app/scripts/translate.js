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
    'ALL':'Tous',
    'LANG':'Langue',
    'TOC' : 'Table des matières',
    'ABOUT' : 'À propos',
    'SEARCH' : 'Rechercher…'
  });
  $translateProvider.translations('en',{
    'HOME':'Home',
    'LAST_LESSONS':'Latest lessons',
    'DOWNLOADS':'Downloads',
    'LESSONS_YEAR_1':'1st year lessons 2011/2012',
    'LESSONS_YEAR_2':'2nd year lessons 2012/2013',
    'LESSONS_YEAR_3A':'3rd year lessons 2013/2014',
    'LESSONS_YEAR_3B':'3rd year lessons 2014/2015',
    'LINKS':'Links',
    'LESSONS_MANUAL':'Manuals',
    'YEAR_3':'3rd year',
    'ALL':'All',
    'LANG':'Lang',
    'TOC' : 'Table of content',
    'ABOUT' : 'About',
    'SEARCH' : 'Search…'
  });
  $translateProvider.translations('jp',{
    'HOME':'ホーム',
    'LAST_LESSONS':'最近授業',
    'DOWNLOADS':'ダウンロード',
    'LESSONS_YEAR_1':'一年授業 2011/2012',
    'LESSONS_YEAR_2':'二年授業 2012/2013',
    'LESSONS_YEAR_3A':'三年授業 2013/2014',
    'LESSONS_YEAR_3B':'三年授業 2014/2015',
    'LINKS':'リンク',
    'LESSONS_MANUAL':'教則本',
    'YEAR_3':'三年',
    'ALL':'',
    'LANG':'言語',
    'TOC' : '目次',
    'ABOUT' : 'About',
    'SEARCH': '検索'
  });
  $translateProvider.preferredLanguage('fr');
}]);
