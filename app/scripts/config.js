'use strict';

angular.module('nihongo').constant('CONFIG', {
  es: {
    host: 'elastic-vmn.rhcloud.com',
    port: '80',
    uri: 'nihongo/article'
  },
  //es:{
  //  host:'localhost',
  //  port:'9200',
  //  uri:'nihongo/article'
  //},
  categories: [
    {
      title: 'Articles annexes',
      dir: 'docs/html',
      pages: [
        {
          title: 'Taper au clavier en japonais',
          file: '/Cours_1annee/clavier_japonais.html'
        },
        {
          title: 'Anki',
          file: '/Cours_1annee/anki.html'
        },
        {
          title: 'LaTex',
          file: '/Cours_1annee/Latex.html'
        },
        {
          title: 'Les Furigana',
          file: '/Cours_3b/furigana.html'
        }
      ]
    },
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
        },
        {
          title: 'Compter en japonais',
          file: 'compter.html'
        },
        {
          title: 'Miscellaneous',
          file: 'miscellaneous.html'
        },
        {
          title: 'Cours 5',
          file: 'cours_5.html'
        },
        {
          title: 'Cours 6',
          file: 'cours_6.html'
        },
        {
          title: 'Cours 7',
          file: 'cours_7.html'
        },
        {
          title: 'Vocabulaire nourriture',
          file: 'vocabulaire_nourriture.html'
        },
        {
          title: 'Cours 8',
          file: 'cours_8.html'
        },
        {
          title: 'Cours 9',
          file: 'cours_9.html'
        },
        {
          title: 'Leçon 3 du livre',
          file: 'Lecon_3_du_livre.html'
        },
        {
          title: 'Cours 10',
          file: 'cours_10.html'
        },
        {
          title: 'Cours 11',
          file: 'cours_11.html'
        },
        {
          title: 'Les adjectifs',
          file: 'liste_adjectifs_1.html'
        },
        {
          title: 'Cours 12',
          file: 'cours_12.html'
        },
        {
          title: 'Les nombres',
          file: 'les_nombres.html'
        },
        {
          title: 'Cours 13',
          file: 'cours_13.html'
        },
        {
          title: 'Cours 14',
          file: 'cours_14.html'
        },
        {
          title: 'Cours 16',
          file: 'cours_16.html'
        },
        {
          title: 'Cours 17',
          file: 'cours_17.html'
        },
        {
          title: 'Cours 18',
          file: 'cours_18.html'
        },
        {
          title: 'Cours 19',
          file: 'cours_19.html'
        },
        {
          title: 'Cours 20',
          file: 'cours_20.html'
        },
        {
          title: 'Cours 21',
          file: 'cours_21.html'
        },
        {
          title: 'Cours 23',
          file: 'cours_23.html'
        },
        {
          title: 'Cours 25',
          file: 'cours_25.html'
        },
        {
          title: 'Cours 26',
          file: 'cours_26.html'
        },
        {
          title: 'Cours 27',
          file: 'cours_27.html'
        },
        {
          title: 'Les adjectifs',
          file: 'adjectifs.html'
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
        },
        {
          title: 'Cours 2 point grammatical',
          file: 'cours_2_Point_grammatical.html'
        },
        {
          title: 'Cours 3',
          file: 'cours_3.html'
        },
        {
          title: 'Cours 4',
          file: 'cours_4.html'
        },
        {
          title: 'Cours 4 formes verbales',
          file: 'cours_4_formes_verbales.html'
        },
        {
          title: 'Cours 4 vocabulaire',
          file: 'cours_4_vocabulaire.html'
        },
        {
          title: 'Cours 5',
          file: 'cours_5.html'
        },
        {
          title: 'Cours 6',
          file: 'cours_6.html'
        },
        {
          title: 'Cours 7',
          file: 'cours_7.html'
        },
        {
          title: 'Cours 8',
          file: 'cours_8.html'
        },
        {
          title: 'Cours 9',
          file: 'cours_9.html'
        },
        {
          title: 'Cours 10',
          file: 'cours_10.html'
        },
        {
          title: 'Cours 11',
          file: 'cours_11.html'
        },

        {
          title: 'Cours 12',
          file: 'cours_12.html'
        },
        {
          title: 'Cours 15',
          file: 'cours_15.html'
        },
        {
          title: 'Cours 16',
          file: 'cours_16.html'
        },
        {
          title: 'Cours 17',
          file: 'cours_17.html'
        },
        {
          title: 'Cours 18',
          file: 'cours_18.html'
        },
        {
          title: 'Cours 19',
          file: 'cours_19.html'
        },
        {
          title: 'Cours 20',
          file: 'cours_20.html'
        },
        {
          title: 'Cours 21',
          file: 'cours_21.html'
        },
        {
          title: 'Cours 22',
          file: 'cours_22.html'
        },
        {
          title: 'Lecture p160',
          file: 'lecture_p160.html'
        },
        {
          title: 'Cours 23',
          file: 'cours_23.html'
        },
        {
          title: 'Cours 24',
          file: 'cours_24.html'
        },
        {
          title: 'Cours 25',
          file: 'cours_25.html'
        },
        {
          title: 'Auxiliaires numéraux',
          file: 'auxiliaires_numeraux.html'
        }
      ]
    },
    {
      title: '3ème année 2013-2014',
      dir: 'docs/html/Cours_3annee',
      epub: 'docs/epub/Cours de japonais niveau 3 2013-2014.epub',
      pages: [
        {
          title: 'Cours 1',
          file: 'cours_1.html'
        },
        {
          title: 'Cours 2',
          file: 'cours_2.html'
        },
        {
          title: 'Cours 3',
          file: 'cours_3.html'
        },
        {
          title: 'Cours 4',
          file: 'cours_4.html'
        },
        {
          title: 'Cours 5',
          file: 'cours_5.html'
        },
        {
          title: 'Cours 6',
          file: 'cours_6.html'
        },
        {
          title: 'Cours 7',
          file: 'cours_7.html'
        },
        {
          title: 'Cours 8',
          file: 'cours_8.html'
        },
        {
          title: 'Cours 9',
          file: 'cours_9.html'
        },
        {
          title: 'Cours 10',
          file: 'cours_10.html'
        },
        {
          title: 'Cours 11',
          file: 'cours_11.html'
        },
        {
          title: 'Cours 12',
          file: 'cours_12.html'
        },
        {
          title: 'Cours 13',
          file: 'cours_13.html'
        },
        {
          title: 'Cours 14',
          file: 'cours_14.html'
        },
        {
          title: 'Cours 15',
          file: 'cours_15.html'
        },
        {
          title: 'Cours 16',
          file: 'cours_16.html'
        },
        {
          title: 'Cours 17',
          file: 'cours_17.html'
        },
        {
          title: 'Cours 18',
          file: 'cours_18.html'
        },
        {
          title: 'Cours 19',
          file: 'cours_19.html'
        },
        {
          title: 'Cours 20',
          file: 'cours_20.html'
        },
        {
          title: 'Cours 21',
          file: 'cours_21.html'
        },
        {
          title: 'Cours 22',
          file: 'cours_22.html'
        },
        {
          title: 'Cours 23',
          file: 'cours_23.html'
        },
        {
          title: 'Cours 24',
          file: 'cours_24.html'
        },
        {
          title: 'Cours 25',
          file: 'cours_25.html'
        },
        {
          title: 'Cours 26',
          file: 'cours_26.html'
        },
        {
          title: 'Cours 27',
          file: 'cours_27.html'
        }
      ]
    },
    {
      title: '3ème année 2014-2015',
      dir: 'docs/html/Cours_3b',
      epub: 'docs/epub/Cours de japonais niveau 3 2014-2015.epub',
      pages: [
        {
          title: 'Cours 1',
          file: 'cours_01.html',
          topics:['oral d\'entrée','kanji 鳴来会作知']
        },
        {
          title: 'Cours 2',
          file: 'cours_02.html',
          topics:['présentations','questions ouvertes et fermées','essayer pour voir','kanji 画用角絵形']
        },
        {
          title: 'Vocabulaire leçon 1',
          file: 'vocabulaire_lecon_1.html'
        },
        {
          title: 'Cours 3',
          file: 'cours_03.html',
          topics: ['essayer pour voir','permission / interdiction','« Le petit chaperon rouge »']
        },
        {
          title: 'Cours 4',
          file: 'cours_04.html',
          topics: ['donner un conseil', 'pronostic']
        },
        {
          title: 'Cours 5',
          file: 'cours_05.html',
          topics: ['probabilité', 'la manière de …', 'essayer de …', 'vous ne pouvez pas …', 'arriver chez quelqu\'un']
        },
        {
          title: 'Cours 6',
          file: 'cours_06.html',
          topics: ['quand, lorsque']
        },
        {
          title: 'Cours 7',
          file: 'cours_07.html',
          topics: ['le « si » systématique']
        },
        {
          title: 'Cours 8',
          file: 'cours_08.html'
        },
        {
          title: 'Vocabulaire leçon 2',
          file: 'vocabulaire_lecon_2.html'
        },
        {
          title: 'Cours 9',
          file: 'cours_09.html',
          topics: ['verbes composés', 'changer / corriger', 'donner', 'recevoir', 'jeux de mots']
        },
        {
          title: 'Cours 10',
          file: 'cours_10.html',
          topics: ['forme polie de donner / recevoir', 'parce que', 'alors que', 'nominalisation', 'être impatient de']
        },
        {
          title: 'Cours 11',
          file: 'cours_11.html',
          topics: ['résolutions de l\'année', 'alcools', 'nominalisation']
        },
        {
          title: 'Cours 12',
          file: 'cours_12.html',
          topics: ['proposition relative « que »', '〜は〜が']
        },
        {
          title: 'Cours 13',
          file: 'cours_13.html',
          topics: ['porter des vêtements', 'anatomie du visage']
        },
        {
          title: 'Cours 14',
          file: 'cours_14.html',
          topics: ['quantificateurs', 'statistiques', 'vouloir faire', 'forme polie des noms', 'emploi du temps']
        },
        {
          title: 'Cours 15',
          file: 'cours_15.html',
          topics: ['kanji 語社理科']
        },
        {
          title: 'Vocabulaire leçon 3',
          file: 'vocabulaire_lecon_3.html'
        },
        {
          title: 'Cours 17',
          file: 'cours_17.html',
          topics: ['facile / difficile / caractéristique / tendance']
        },
        {
          title: 'Révisions',
          file: 'revisions.html'
        },
        {
          title: 'Cours 18',
          file: 'cours_18.html',
          topics: ['changement volonté action','changement état','choisir','kanji 豆酒油炭畑']
        },
        {
          title: 'Cours 19',
          file: 'cours_19.html',
          topics: ['adverbes']
        },
        {
          title: 'Cours 20',
          file: 'cours_20.html',
          topics: ['comparaison','superlatif']
        },
        {
          title: 'Cours 21',
          file: 'cours_21.html',
          topics: ['énumération qualité / défauts']
        },
        {
          title: 'Cours 22',
          file: 'cours_22.html'
        },
        {
          title: 'Text 3 - Kimono',
          file: 'text3_kimono.html'
        },
        {
          title: 'Cours 23',
          file: 'cours_23.html'
        }
      ]
    }
  ],
  toc: {
    templateUrl: 'toc.html'
  },
  kanji:{
    base:'docs/kanji'
  }
});
