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
                    file: 'cours_1.html',
                    topics: ['Kanji 鳴来会作知']
                },
                {
                    title: 'Cours 2',
                    file: 'cours_2.html',
                    topics: ['といえば : opinion personnelle', 'Chiffre + も: tant que ça', 'こと:énumération des causes/raisons', 'Kanji 画用角絵形黒顔親']
                },
                {
                    title: 'Cours 3',
                    file: 'cours_3.html',
                    topics: ['Tendance sociale V+はじめます', 'Kanji 遠近道通交', '«Le petit chaperon rouge»']
                },
                {
                    title: 'Cours 4',
                    file: 'cours_4.html',
                    topics: ['Vたら:conditionnel', 'のでしょうか:connotation mystère/doute', '〜のは〜だ:Ce qui est ~, c\'est ~', 'Kanji 里野原内外']
                },
                {
                    title: 'Cours 5',
                    file: 'cours_5.html',
                    topics: ['forme volitive', 'ようとしても:même si …', 'emploi du temps', 'kanji 活図工']
                },
                {
                    title: 'Cours 6',
                    file: 'cours_6.html',
                    topics: ['Je vais préparer ~ / C\'est préparé', 'kanji 語社理科']
                },
                {
                    title: 'Cours 7',
                    file: 'cours_7.html',
                    topics: ['Fonctions dans l\'entreprise', 'Kanji 歯指鼻息薬皮']
                },
                {
                    title: 'Cours 8',
                    file: 'cours_8.html',
                    topics: ['Vneutre+ような+nom: comme celui/celle que', 'kanji 豆酒油炭畑']
                },
                {
                    title: 'Cours 9',
                    file: 'cours_9.html',
                    topics: ['Seulement ! Que ça !', 'Vouloir', 'Kanji 暑寒軽重暗短']
                },
                {
                    title: 'Cours 10',
                    file: 'cours_10.html',
                    topics: ['Vneutre+[のは|から]:Résultat, cause']
                },
                {
                    title: 'Cours 11',
                    file: 'cours_11.html',
                    topics: ['On dirait ~', 'Kanji 悪安深速等苦']
                },
                {
                    title: 'Cours 12',
                    file: 'cours_12.html'
                },
                {
                    title: 'Cours 13',
                    file: 'cours_13.html',
                    topics: ['N¹+のような+N²: tel que ~', 'Xは Yほど + nég: X n\'est pas aussi ~ que Y']
                },
                {
                    title: 'Cours 14',
                    file: 'cours_14.html',
                    topics: ['Le superlatif 一番', 'kanji 悲美幸福有平']
                },
                {
                    title: 'Cours 15',
                    file: 'cours_15.html',
                    topics: ['Vてくる/Vていく: Expression de l\'évolution']
                },
                {
                    title: 'Cours 16',
                    file: 'cours_16.html',
                    topics: ['les jours du mois', 'Nominalisation des adjectifs さ']
                },
                {
                    title: 'Cours 17',
                    file: 'cours_17.html',
                    topics: ['Énumération', 'Kanji 投打受泳登転']
                },
                {
                    title: 'Cours 18',
                    file: 'cours_18.html',
                    topics: ['Information', 'Kanji 勝負始終落拾']
                },
                {
                    title: 'Cours 19',
                    file: 'cours_19.html',
                    topics: ['C\'est normal que, c\'est naturel']
                },
                {
                    title: 'Cours 20',
                    file: 'cours_20.html',
                    topics: ['Comment s\'habiller', 'Kanji 起飲着遊服庭']
                },
                {
                    title: 'Cours 21',
                    file: 'cours_21.html',
                    topics: ['睡眠: le sommeil']
                },
                {
                    title: 'Cours 22',
                    file: 'cours_22.html',
                    topics: ['Forme passive']
                },
                {
                    title: 'Cours 23',
                    file: 'cours_23.html',
                    topics: ['Forme passive']
                },
                {
                    title: 'Cours 24',
                    file: 'cours_24.html',
                    topics: ['Forme passive', 'Kanji 植向根育葉実']
                },
                {
                    title: 'Cours 25',
                    file: 'cours_25.html',
                    topics: ['Forme passive', 'Kanji 放助箱返開化']
                },
                {
                    title: 'Cours 26',
                    file: 'cours_26.html',
                    topics: ['Potentiel']
                },
                {
                    title: 'Cours 27',
                    file: 'cours_27.html',
                    topics: ['«Doraemon»']
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
                    topics: ['oral d\'entrée', 'kanji 鳴来会作知']
                },
                {
                    title: 'Cours 2',
                    file: 'cours_02.html',
                    topics: ['présentations', 'questions ouvertes et fermées', 'essayer pour voir', 'kanji 画用角絵形']
                },
                {
                    title: 'Vocabulaire leçon 1',
                    file: 'vocabulaire_lecon_1.html'
                },
                {
                    title: 'Cours 3',
                    file: 'cours_03.html',
                    topics: ['essayer pour voir', 'permission / interdiction', '« Le petit chaperon rouge »']
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
                    topics: ['changement volonté action', 'changement état', 'choisir', 'kanji 豆酒油炭畑']
                },
                {
                    title: 'Cours 19',
                    file: 'cours_19.html',
                    topics: ['adverbes']
                },
                {
                    title: 'Cours 20',
                    file: 'cours_20.html',
                    topics: ['comparaison', 'superlatif']
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
                    file: 'cours_23.html',
                    topics: ['V² en faisant V¹']
                },
                {
                    title: 'Cours 24',
                    file: 'cours_24.html',
                    topics: ['verbes potentiels', 'しか : Seulement, que']
                },
                {
                    title: 'Vocabulaire leçon 4',
                    file: 'vocabulaire_lecon_4.html'
                },
                {
                    title: 'Text 4 : きせつとはいく',
                    file: 'text4_kisetsutohaiku.html'
                },
                {
                    title: 'Cours 25',
                    file: 'cours_25.html'
                },
                {
                    title: 'Cours 26',
                    file: 'cours_26.html',
                    topics: ['forme volitive', 'je pense faire … と思っています', 'projet détaillé つもりです', 'programmé よていです']
                },
                {
                    title: 'Vocabulaire leçon 5',
                    file: 'vocabulaire_lecon_5.html'
                },
                {
                    title: 'Cours 27',
                    file: 'cours_27.html',
                    topics: ['Conjecture, situration, climat 〜でしょう']
                }
            ]
        }
    ],
    toc: {
        templateUrl: 'toc.html'
    },
    kanji: {
        base: 'docs/kanji'
    }
});
//# sourceMappingURL=config.js.map