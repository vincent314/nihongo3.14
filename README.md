nihongo3.14
===========

Japanese lessons notes (**in french**) hosted on a static website. See website [http://vincent314.github.io/nihongo3.14/](http://vincent314.github.io/nihongo3.14/)

Japanese lessons notes are written with [Markdown](http://daringfireball.net/projects/markdown/syntax) language which are
converted into HTML.

Download and run localy
-------------------

Install [Git](http://git-scm.com/), [NodeJS](http://nodejs.org/), [bower](http://bower.io/) and [gulp](http://gruntjs.com/)

    npm install -g bower
    npm install -g gulp

Download sources from 

    git clone https://github.com/vincent314/nihongo3.14
    cd nihongo3.14
    
Create file es-auth.js (used for ElasticSearch indexing) on root folder (replace XXXXXX with a correct value):

    module.exports = {
      user: 'XXXXX',
      password: 'XXXXXX'
    };
    
###Downloads dependencies

    npm install
    bower install

###Run
    
    gulp serve
    
###Build

    gulp build
    
###Publish

    cd output
    surge
