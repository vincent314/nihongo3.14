Markdown et les Furigana
========================

Pour rédiger des articles de blog, avec du japonais ou sans, il existe plusieurs possibilités : directement en HTML ou avec une interface WYSIWYG (fenêtre d'édition avec des fonctionnalité de formattage). Il existe une autre solution qui consiste à utiliser un autre language de formattage de texte, comme le WIKI ou le Markdown.

Le [Markdown](http://fr.wikipedia.org/wiki/Markdown) permet d'écrire du texte avec des instruction de formattage permettant de générer du HTML, mais dont le code source est parfaitement lisible tel quel, à la différence d'un language à balise comme le HTML qui est très très verbeux comparativement.

Par exemple :

    * Premier élément de la liste
    * Texte en **gras** ou en *italique*
    * Ceci est un [lien](http://google.com)
    
devient :

* Premier élément de la liste
* Texte en **gras** ou en *italique*
* Ceci est un [lien](http://google.com)

et où le code HTML, beaucoup moins lisible est :

    <ul>
    <li>Premier élément de la liste</li>
    <li>Texte en <strong>gras</strong> ou en <em>italique</em></li>
    <li>Ceci est un <a href="http://google.com">lien</a></li>
    </ul>
    
