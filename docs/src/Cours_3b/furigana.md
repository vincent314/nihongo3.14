Furigana
==========

Les navigateurs
--------------

Ce site utilise abondamment les [furigana](http://en.wikipedia.org/wiki/Furigana), ces petits kana au dessus des kanji pour indiquer la prononciation. Je les trouve extrèmement pratiques pour l'apprentissage du Japonais, et plus particulièrement pour lire ou apprendre les Kanji.

Cela est rendu possible par la nouvelle balise &lt;ruby&gt; introduite par HTML5, mais qui n'est pas forcément [supportée](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby) par tous les navigateurs.

* Chrome : depuis la version 5
* Internet Explorer : depuis la version 5
* Firefox : non supporté de base, utiliser l'extension [HTML ruby](https://addons.mozilla.org/en-US/firefox/addon/html-ruby/)
* Opera : depuis la version 15
* Android : oui
* Firefox mobile : non
* IE mobile : oui
* Opera mobile : non
* Safari mobile : oui

Vous avez peut-être rencontré des problèmes de lecture de ces articles, dans ce cas pouvez vérifier la version de votre navigateur et vérifier les furigana ci-dessous :

<ruby>漢字<rp>（</rp><rt>かんじ</rt><rp>）</rp></ruby> <strong><ruby><rp>Si vous lisez ceci, </rp><rt></rt><rp>votre navigateur ne supporte pas la balise ruby et affichera les furigana entre parenthèses !</rp></ruby></strong>

Comment marche la balise ruby ?
------------

La balise **ruby** fonctionne de la manière suivante :

    <ruby>Kanji<rp>(</rp><rt>furigana</rt><rp>)</rp></ruby>
    
avec :

* `<ruby>` la balise parente
* `<rp>` (au nombre de 2) les informations à afficher avant et après les furigana si la fonctionnalité n'est pas supportée. Typiquement des paranthèses.
* `<rt>` les furigana, affichés au dessus des Kanji ou entre les éléments définis par `<rp>`

Markdown
------------

*C'est un peu long à écrire tout ça ?* me diriez-vous …

Houlà, oui ! D'une manière générale, je ne saisi les articles ni en HTML, ni à travers un « éditeur riche ». J'utilise le [Markdown](http://daringfireball.net/projects/markdown/), qui est une syntaxe extrêmement légère destinée à générer de l'HTML et dont les sources sont elles-même très lisibles.

Quelques outils existent :

* [Retext](http://sourceforge.net/projects/retext/) éditeur pour Linux ou OSX et écrit en python
* [Macdown](http://macdown.uranusjr.com/) éditeur pour OSX
* [Gaiden](https://github.com/kobo/gaiden) pour générer des sites statiques

Cependant, de base ces outils ne supportent pas les furigana. Markdown ne possède pas de syntaxe pour écrire des furigana à part en injectant de l'HTML.

### furigana-markdown

Pour Linux en général et Retext en particulier, il existe l'excellente extension Markdown Python [furigana markdown](https://github.com/djfun/furigana_markdown) qui introduit les 2 syntaxes suivantes en markdown :

1. `[字](-じ)` (ne pas oublier le tiret)
2.  ma préférée : 字&#65288;じ&#65289; (avec les parenthèses longues du clavier japonais)

### Pegdown

[Pegdown](https://github.com/sirthias/pegdown) est une librairie JAVA qui transforme les sources Markdown en HTML, est open-source et complétement ouverte aux extensions. Elle est notamment utilisée par [Gaiden](https://github.com/kobo/gaiden).

J'ai donc réalisé l'extensions [pegdown-furigana](https://github.com/vincent314/pegdown-furigana) afin que Pegdown puisse supporter les furigana. Très inspirée de l'extension Python de [Djfun](https://github.com/djfun/furigana_markdown/blob/master/furigana.py), cette extension supporte pour le moment uniquement la seconde syntaxe 字&#65288;じ&#65289;.

### Showdown

Tout comme Pegdown, [Showdown](https://github.com/showdownjs/showdown) est une librairie Javascript NodeJS de génération HTML à partir de sources Markdown. L'intérêt de cette bibliothèque en particulier, est son support d'extensions.

Là encore, une nouvelle extension [showdown-furigana-extension](https://github.com/vincent314/showdown-furigana-extension) a été créée pour supporter les furigana.
