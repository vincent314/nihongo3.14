"use strict";function TimelineController(a,b,c,d,e,f){var g=this;g.$http=d,g.$sanitize=e,g.$scope=a,g.$q=f,g.currentIndex=0,a.pages=[],g.timeline=c.buildTimeline(b.categories),g.printPage(g.currentIndex),a.pagingFunction=function(){g.currentIndex<g.timeline.length-1&&(g.currentIndex++,g.printPage(g.currentIndex))}}angular.module("nihongo",["ngRoute","infinite-scroll","ngSanitize","pascalprecht.translate","ngResource"]).config(["$routeProvider","CONFIG",function(a,b){_(b.categories).forEach(function(b){_(b.pages).forEach(function(c){var d="/"+getSlug(b.title)+"/"+getSlug(c.title);a.when(d,{templateUrl:"templates/page.html",controller:"PageController",title:c.title,resolve:{params:function(){return{url:b.dir+"/"+c.file}}}})})}),a.when("/timeline",{templateUrl:"templates/timeline.html",controller:"TimelineController",title:"Timeline"}),a.when("/search",{templateUrl:"templates/search.html",controller:"SearchController",controllerAs:"searchController",title:"Rechercher"}),a.otherwise({templateUrl:b.toc.templateUrl,controller:"TocController",title:"Table des matières"})}]).run(["$rootScope","$route",function(a,b){a.$on("$routeChangeSuccess",function(){a.title=b.current.title})}]),angular.module("nihongo").constant("CONFIG",{es:{host:"elastic-vmn.rhcloud.com",port:"80",uri:"nihongo/article"},categories:[{title:"Articles annexes",dir:"docs/html",pages:[{title:"Taper au clavier en japonais",file:"/Cours_1annee/clavier_japonais.html"},{title:"Anki",file:"/Cours_1annee/anki.html"},{title:"LaTex",file:"/Cours_1annee/Latex.html"},{title:"Les Furigana",file:"/Cours_3b/furigana.html"}]},{title:"1ère année 2011-2012",pdf:"docs/pdf/Cours_japonais_1annee.pdf",dir:"docs/html/Cours_1annee",pages:[{title:"Cours 1",file:"cours_1.html"},{title:"Cours 3",file:"cours_3.html"},{title:"Cours 4",file:"cours_4.html"},{title:"Compter en japonais",file:"compter.html"},{title:"Miscellaneous",file:"miscellaneous.html"},{title:"Cours 5",file:"cours_5.html"},{title:"Cours 6",file:"cours_6.html"},{title:"Cours 7",file:"cours_7.html"},{title:"Vocabulaire nourriture",file:"vocabulaire_nourriture.html"},{title:"Cours 8",file:"cours_8.html"},{title:"Cours 9",file:"cours_9.html"},{title:"Leçon 3 du livre",file:"Lecon_3_du_livre.html"},{title:"Cours 10",file:"cours_10.html"},{title:"Cours 11",file:"cours_11.html"},{title:"Les adjectifs",file:"liste_adjectifs_1.html"},{title:"Cours 12",file:"cours_12.html"},{title:"Les nombres",file:"les_nombres.html"},{title:"Cours 13",file:"cours_13.html"},{title:"Cours 14",file:"cours_14.html"},{title:"Cours 16",file:"cours_16.html"},{title:"Cours 17",file:"cours_17.html"},{title:"Cours 18",file:"cours_18.html"},{title:"Cours 19",file:"cours_19.html"},{title:"Cours 20",file:"cours_20.html"},{title:"Cours 21",file:"cours_21.html"},{title:"Cours 23",file:"cours_23.html"},{title:"Cours 25",file:"cours_25.html"},{title:"Cours 26",file:"cours_26.html"},{title:"Cours 27",file:"cours_27.html"},{title:"Les adjectifs",file:"adjectifs.html"}]},{title:"2ème année 2012-1013",dir:"docs/html/Cours_2annee",pdf:"docs/pdf/Cours_japonais_2annee.pdf",epub:"docs/epub/Cours de japonais niveau 2 2012-2013.epub",pages:[{title:"Cours 1",file:"cours_1.html"},{title:"Cours 1 jours de la semaine",file:"cours_1_jours_de_la_semaine.html"},{title:"Cours 2",file:"cours_2.html"},{title:"Cours 2 point grammatical",file:"cours_2_Point_grammatical.html"},{title:"Cours 3",file:"cours_3.html"},{title:"Cours 4",file:"cours_4.html"},{title:"Cours 4 formes verbales",file:"cours_4_formes_verbales.html"},{title:"Cours 4 vocabulaire",file:"cours_4_vocabulaire.html"},{title:"Cours 5",file:"cours_5.html"},{title:"Cours 6",file:"cours_6.html"},{title:"Cours 7",file:"cours_7.html"},{title:"Cours 8",file:"cours_8.html"},{title:"Cours 9",file:"cours_9.html"},{title:"Cours 10",file:"cours_10.html"},{title:"Cours 11",file:"cours_11.html"},{title:"Cours 12",file:"cours_12.html"},{title:"Cours 15",file:"cours_15.html"},{title:"Cours 16",file:"cours_16.html"},{title:"Cours 17",file:"cours_17.html"},{title:"Cours 18",file:"cours_18.html"},{title:"Cours 19",file:"cours_19.html"},{title:"Cours 20",file:"cours_20.html"},{title:"Cours 21",file:"cours_21.html"},{title:"Cours 22",file:"cours_22.html"},{title:"Lecture p160",file:"lecture_p160.html"},{title:"Cours 23",file:"cours_23.html"},{title:"Cours 24",file:"cours_24.html"},{title:"Cours 25",file:"cours_25.html"},{title:"Auxiliaires numéraux",file:"auxiliaires_numeraux.html"}]},{title:"3ème année 2013-2014",dir:"docs/html/Cours_3annee",epub:"docs/epub/Cours de japonais niveau 3 2013-2014.epub",pages:[{title:"Cours 1",file:"cours_1.html"},{title:"Cours 2",file:"cours_2.html"},{title:"Cours 3",file:"cours_3.html"},{title:"Cours 4",file:"cours_4.html"},{title:"Cours 5",file:"cours_5.html"},{title:"Cours 6",file:"cours_6.html"},{title:"Cours 7",file:"cours_7.html"},{title:"Cours 8",file:"cours_8.html"},{title:"Cours 9",file:"cours_9.html"},{title:"Cours 10",file:"cours_10.html"},{title:"Cours 11",file:"cours_11.html"},{title:"Cours 12",file:"cours_12.html"},{title:"Cours 13",file:"cours_13.html"},{title:"Cours 14",file:"cours_14.html"},{title:"Cours 15",file:"cours_15.html"},{title:"Cours 16",file:"cours_16.html"},{title:"Cours 17",file:"cours_17.html"},{title:"Cours 18",file:"cours_18.html"},{title:"Cours 19",file:"cours_19.html"},{title:"Cours 20",file:"cours_20.html"},{title:"Cours 21",file:"cours_21.html"},{title:"Cours 22",file:"cours_22.html"},{title:"Cours 23",file:"cours_23.html"},{title:"Cours 24",file:"cours_24.html"},{title:"Cours 25",file:"cours_25.html"},{title:"Cours 26",file:"cours_26.html"},{title:"Cours 27",file:"cours_27.html"}]},{title:"3ème année 2014-2015",dir:"docs/html/Cours_3b",epub:"docs/epub/Cours de japonais niveau 3 2014-2015.epub",pages:[{title:"Cours 1",file:"cours_01.html",topics:["oral d'entrée","kanji 鳴来会作知"]},{title:"Cours 2",file:"cours_02.html",topics:["présentations","questions ouvertes et fermées","essayer pour voir","kanji 画用角絵形"]},{title:"Vocabulaire leçon 1",file:"vocabulaire_lecon_1.html"},{title:"Cours 3",file:"cours_03.html",topics:["essayer pour voir","permission / interdiction","« Le petit chaperon rouge »"]},{title:"Cours 4",file:"cours_04.html",topics:["donner un conseil","pronostic"]},{title:"Cours 5",file:"cours_05.html",topics:["probabilité","la manière de …","essayer de …","vous ne pouvez pas …","arriver chez quelqu'un"]},{title:"Cours 6",file:"cours_06.html",topics:["quand, lorsque"]},{title:"Cours 7",file:"cours_07.html",topics:["le « si » systématique"]},{title:"Cours 8",file:"cours_08.html"},{title:"Vocabulaire leçon 2",file:"vocabulaire_lecon_2.html"},{title:"Cours 9",file:"cours_09.html",topics:["verbes composés","changer / corriger","donner","recevoir","jeux de mots"]},{title:"Cours 10",file:"cours_10.html",topics:["forme polie de donner / recevoir","parce que","alors que","nominalisation","être impatient de"]},{title:"Cours 11",file:"cours_11.html",topics:["résolutions de l'année","alcools","nominalisation"]},{title:"Cours 12",file:"cours_12.html",topics:["proposition relative « que »","〜は〜が"]},{title:"Cours 13",file:"cours_13.html",topics:["porter des vêtements","anatomie du visage"]},{title:"Cours 14",file:"cours_14.html",topics:["quantificateurs","statistiques","vouloir faire","forme polie des noms","emploi du temps"]},{title:"Cours 15",file:"cours_15.html",topics:["kanji 語社理科"]}]}],toc:{templateUrl:"toc.html"}}),angular.module("nihongo").config(["$translateProvider",function(a){a.translations("fr",{HOME:"Accueil",LAST_LESSONS:"Derniers cours",DOWNLOADS:"Téléchargements",LESSONS_YEAR_1:"Cours 1ère année 2011/2012",LESSONS_YEAR_2:"Cours 2ème année 2012/2013",LESSONS_YEAR_3A:"Cours 3ème année 2013/2014",LESSONS_YEAR_3B:"Cours 3ème année 2014/2015",LINKS:"Liens",LESSONS_MANUAL:"Supports de cours",YEAR_3:"3ième année",ALL:"Tous",LANG:"Langue",TOC:"Table des matières",ABOUT:"À propos",SEARCH:"Rechercher…",RESULTS:"Résultats",CONNECTION_ERROR:"Il y a eu un problème de connection avec le moteur de recherche. Il se repose probablement, tout le monde a le droit à un peu de repos après tout. Réessayez d'ici quelques secondes et je suis sûr qu'il sera ravis de vous répondre."}),a.translations("en",{HOME:"Home",LAST_LESSONS:"Latest lessons",DOWNLOADS:"Downloads",LESSONS_YEAR_1:"1st year lessons 2011/2012",LESSONS_YEAR_2:"2nd year lessons 2012/2013",LESSONS_YEAR_3A:"3rd year lessons 2013/2014",LESSONS_YEAR_3B:"3rd year lessons 2014/2015",LINKS:"Links",LESSONS_MANUAL:"Manuals",YEAR_3:"3rd year",ALL:"All",LANG:"Lang",TOC:"Table of content",ABOUT:"About",SEARCH:"Search…",RESULTS:"Results",CONNECTION_ERROR:"Connection error, the search engine may be sleeping, please try again in few seconds"}),a.translations("jp",{HOME:"ホーム",LAST_LESSONS:"最近授業",DOWNLOADS:"ダウンロード",LESSONS_YEAR_1:"一年授業 2011/2012",LESSONS_YEAR_2:"二年授業 2012/2013",LESSONS_YEAR_3A:"三年授業 2013/2014",LESSONS_YEAR_3B:"三年授業 2014/2015",LINKS:"リンク",LESSONS_MANUAL:"教則本",YEAR_3:"三年",ALL:"",LANG:"言語",TOC:"目次",ABOUT:"About",SEARCH:"検索",RESULTS:"ヒット",CONNECTION_ERROR:"Connection error, the search engine may be sleeping, please try again in few seconds"}),a.preferredLanguage("fr")}]),angular.module("nihongo").service("NihongoService",["CONFIG","$resource",function(a,b){var c={};return c.buildRoute=function(a,b){return"#/"+getSlug(a)+"/"+getSlug(b)},c.buildTimeline=function(a){return _.chain(a).map(function(a){var b=a.pages;return _(b).each(function(b){b.category={dir:a.dir}}),b}).flatten().reverse().value()},c.search=function(c){var d=b("http://"+a.es.host+":"+a.es.port+"/"+a.es.uri+"/_search");return d.get({q:"japanese:"+c+" OR french:"+c}).$promise},c}]),angular.module("nihongo").controller("TocController",["$scope","CONFIG",function(a,b){a.categories=b.categories,a.buildRoute=function(a,b){return"#/"+getSlug(a)+"/"+getSlug(b)}}]),angular.module("nihongo").controller("PageController",["$scope","$location","CONFIG","NihongoService","params",function(a,b,c,d,e){var f="#"+b.path(),g=[];_(c.categories).forEach(function(a){_(a.pages).forEach(function(b){var c=d.buildRoute(a.title,b.title,!0);g.push({path:c,page:b,category:a})})});var h=_(g).findIndex(function(a){return f===a.path});h>0&&(a.previous=g[h-1]),h<g.length-1&&(a.next=g[h+1]),a.url=e.url}]),angular.module("nihongo").controller("TimelineController",["$scope","CONFIG","NihongoService","$http","$sanitize","$q",TimelineController]),TimelineController.prototype.printPage=function(a){var b=this,c=this.timeline[a];return this.$http.get(c.category.dir+"/"+c.file).then(function(a){return b.$scope.pages.push(b.$sanitize(a.data)),a.data})["catch"](function(a){var b=a.status+" : "+a.data;console.log(b)})},angular.module("nihongo").controller("HeaderController",["$scope","$translate","$location",function(a,b,c){a.switchLang=function(a){b.use(a)},a.search=function(){c.path("/search").search("searchString",a.searchString)}}]);var SearchController=function(a,b){var c=this,d=a.searchString;d?b.search(d).then(function(a){c.searchSuccess(a)})["catch"](function(a){c.searchFailure(a)}):(this.total=0,this.hits=[])};SearchController.prototype.searchSuccess=function(a){this.total=a.hits.total,this.hits=a.hits.hits},SearchController.prototype.searchFailure=function(a){this.error=a,console.log("Error status : "+a.status)},SearchController.$inject=["$routeParams","NihongoService"],angular.module("nihongo").controller("SearchController",SearchController),angular.module("nihongo").directive("pagination",function(){return{templateUrl:"templates/pagination.html",scope:{previous:"=previous",next:"=next"}}}),angular.module("nihongo").filter("percentage",["$filter",function(a){return function(b,c){return a("number")(100*b,c)+"%"}}]);