var http = require('http');
var extend = require('extend');
var configReader = require('./configReader');
var Q = require('q');
var fs = require('fs');
var getSlug = require('speakingurl');

/**
 *
 * @param index
 * @param options
 * @constructor
 */
function ElasticSearch(index, options, grunt, auth) {
  this.options = options;
  this.index = index;
  this.configReader = configReader;
  this.grunt = grunt;
  this.auth = auth;
}

/**
 *
 * @returns {promise|*|Q.promise}
 */
ElasticSearch.prototype.toctoc = function () {
  var deferred = Q.defer();

  var options = extend({
    path: '/',
    method: 'GET'
  }, this.options);
  var req = http.request(options, function (res) {
    if (res.statusCode !== 200) {
      deferred.reject({statusCode: res.statusCode});
      return;
    }

    res.on('data', function (chunk) {
      deferred.resolve(JSON.parse(chunk.toString()));
    });
  });

  req.on('error', function (e) {
    deferred.reject(e);
  });

  req.end();
  return deferred.promise;
};

/**
 *
 * @param file
 * @param uri
 * @param id
 * @returns {promise|*|Q.promise}
 */
ElasticSearch.prototype.indexFile = function (file, category, page, id) {
  var deferred = Q.defer();
  var content;
  var self = this;
  try {
    content = fs.readFileSync(file, 'UTF-8');
  } catch (e) {
    // Invalid file or file not found
    deferred.reject(e);
    return deferred.promise;
  }

  var filtered = this.filter(content);

  var entry = {};
  entry.french = filtered;
  entry.japanese = filtered;
  entry.uri = self.getUrl(category.title, page.title);
  entry.category = category.title;
  entry.page = page.title;

  // Basic Authentification
  var authHeader = {};
  if (this.auth) {
    var user = this.auth.user;
    var password = this.auth.password;
    authHeader = user + ':' + password;
  }

  var options = extend({
    path: '/' + this.index + '/article/' + id,
    method: 'PUT',
    auth: authHeader
  }, this.options);


  var req = http.request(options, function (res) {
    if (res.statusCode !== 200 && res.statusCode !== 201) {
      deferred.reject({statusCode: res.statusCode});
      self.logError('Error indexing : ' + file);
      return;
    }
    res.on('data', function (chunk) {
      deferred.resolve(id);
    });
  });

  console.log('path:' + req.path);
  req.write(JSON.stringify(entry));
  req.end();

  return deferred.promise;
};

/**
 *
 * @param configFile
 */
ElasticSearch.prototype.indexFilesFromConfig = function (configFile, grunt) {
  var config = configReader.read(configFile);
  var self = this;
  var result = Q(0);

  config.categories.forEach(function (category) {
    category.pages.forEach(function (page) {
      var file = 'app/' + category.dir + '/' + page.file;
      result = result.then(function (id) {
        return self.indexFile(file, category, page, id + 1);
      });
    });
  });

  return result;
};

ElasticSearch.prototype.getUrl = function (categoryTitle, pageTitle) {
  return '#/' + getSlug(categoryTitle) + '/' + getSlug(pageTitle);
};

ElasticSearch.prototype.filter = function (content) {
  return content.replace(/<ruby( class="kanji")?><rb>([^<]+)<\/rb><rp>.<\/rp><rt>[^<]+<\/rt><rp>.<\/rp><\/ruby>/ig, '$2');
};

ElasticSearch.prototype.logOK = function (msg) {
  if (this.grunt) {
    this.grunt.log.ok(msg);
  } else {
    console.log('OK:' + msg);
  }
};

ElasticSearch.prototype.logError = function (msg) {
  if (this.grunt) {
    this.grunt.log.error(msg);
  } else {
    console.log('ERROR:' + msg);
  }
};

ElasticSearch.prototype.init = function () {
  var deferred = Q.defer();

  var data = {
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 1,
      "analysis": {
        "analyzer": {
          "my_french": {
            "type": "french",
            "filter": [
              "standard",
              "lowercase",
              "stop"
            ],
            "char_filter": [
              "html_strip"
            ]
          },
          "my_japanese": {
            "type": "kuromoji",
            "filter": [
              "standard",
              "lowercase",
              "stop"
            ],
            "char_filter": [
              "html_strip"
            ]
          },
          "romaji_analyzer": {
            "tokenizer": "kuromoji_tokenizer",
            "filter": ["romaji_readingform", "kuromoji_stemmer"]
          },
          "html": {
            "type": "custom",
            "tokenizer": "standard",
            "filter": [
              "standard",
              "lowercase",
              "stop"
            ],
            "char_filter": [
              "html_strip"
            ]
          }
        },
        "filter": {
          "romaji_readingform": {
            "type": "kuromoji_readingform",
            "use_romaji": true
          }
        }
      }
    },
    "mappings": {
      "article": {
        "_source": {
          "excludes": ["french", "japanese"]
        },
        "properties": {
          "title": {
            "type": "string"
          },
          "uri": {
            "type": "string",
            "index": "not_analyzed"
          },
          "french": {
            "type": "string",
            "analyzer": "my_french"
          },
          "japanese": {
            "type": "string",
            "analyzer": "romaji_analyzer"
          },
          "category": {
            "type": "string"
            , "analyzer": "french"
          },
          "page": {
            "type": "string",
            "analyzer": "french"
          }
        }
      }
    }
  };

  // Basic Authentification
  var authHeader = {};
  if (this.auth) {
    var user = this.auth.user;
    var password = this.auth.password;
    authHeader = user + ':' + password;
  }

  var options = extend({
    path: this.index,
    method: 'PUT',
    auth: authHeader
  }, this.options);

  var req = http.request(options, function (res) {
    //if (res.statusCode != 200 && res.statusCode != 201) {
    //  deferred.reject(res.statusCode);
    //  return;
    //}

    res.on('data', function (chunk) {
      deferred.resolve(chunk.toString());
    });
  });

  req.write(JSON.stringify(data));
  req.end();

  return deferred.promise;
};

module.exports = ElasticSearch;
