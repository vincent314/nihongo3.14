var http = require('http');
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
function ElasticSearch(options, grunt) {
  this.index = options.index;
  this.hostname = options.hostname;
  this.port = options.port;
  this.configReader = configReader;
  this.auth = options.auth;
  this.grunt = grunt;
}

/**
 *
 * @returns {promise|*|Q.promise}
 */
ElasticSearch.prototype.toctoc = function () {
  var deferred = Q.defer();

  var options = {
    hostname:this.hostname,
    port:this.port,
    path: '/',
    method: 'GET'
  };
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
ElasticSearch.prototype.indexFile = function (file, category, page) {
  var deferred = Q.defer();
  var content;
  var self = this;
  var id = getSlug(category.title) + '-' + getSlug(page.title);
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

  var options = {
    hostname: this.hostname,
    port : this.port,
    path: '/' + this.index + '/article/' + id,
    method: 'PUT',
    auth: authHeader
  };


  var req = http.request(options, function (res) {
    if (res.statusCode !== 200 && res.statusCode !== 201) {
      deferred.reject({statusCode: res.statusCode});
      self.logError('Error indexing : ' + file);
      return;
    }
    res.on('data', function (chunk) {
      deferred.resolve();
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

/**
 *
 * @param configFile Configuration file path
 * @param nb last nb elements to index (optional)
 * @param grunt grunt instance (optional)
 * @returns {*}
 */
ElasticSearch.prototype.indexFilesFromConfig = function (configFile, nb, grunt) {
  var config = configReader.read(configFile);
  var self = this;
  var result = Q(function () {
  });
  var entries = [];

  config.categories.forEach(function (category) {
    category.pages.forEach(function (page) {
      entries.push({category: category, page: page});
    });
  });

  if (nb && nb <= entries.length) {
    entries = entries.slice(entries.length - nb);
  }

  entries.forEach(function (entry) {
    var file = 'app/' + entry.category.dir + '/' + entry.page.file;
    result = result.then(function () {
      return self.indexFile(file, entry.category, entry.page);
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

/**
 * Init the elasticsearch index with mapping file
 *
 * @returns {promise|*|Q.promise}
 */
ElasticSearch.prototype.init = function () {
  var deferred = Q.defer();

  var data = require('./index_mapping');

  // Basic Authentification
  var authHeader = {};
  if (this.auth) {
    var user = this.auth.user;
    var password = this.auth.password;
    authHeader = user + ':' + password;
  }

  var options = {
    hostname:this.hostname,
    port:this.port,
    path: '/' + this.index,
    method: 'PUT',
    auth: authHeader
  };

  console.log(this.hostname);

  var req = http.request(options, function (res) {
    res.on('data', function (chunk) {
      if (res.statusCode !== 200 && res.statusCode !== 201) {
        deferred.reject(chunk.toString());
      } else {
        deferred.resolve(chunk.toString());
      }
    });
  });

  req.write(JSON.stringify(data));
  req.end();

  return deferred.promise;
};

/**
 * Set an alias to the index
 *
 * @returns {promise|*|Q.promise}
 */
ElasticSearch.prototype.setAlias = function () {

  // Basic Authentification
  var authHeader = {};
  if (this.auth) {
    var user = this.auth.user;
    var password = this.auth.password;
    authHeader = user + ':' + password;
  }

  var options = {
    hostname:this.hostname,
    port:this.port,
    path: '/_aliases',
    method:'POST',
    auth:authHeader
  };

  var data = {
    actions: [
      {add: {index: this.index, alias: 'nihongo'}}
    ]
  };

  var deferred = Q.defer();
  var req = http.request(options, function (res) {
    res.on('data', function (chunk) {
      if (res.statusCode !== 200 && res.statusCode !== 201) {
        deferred.reject(chunk.toString());
      } else {
        deferred.resolve(chunk.toString());
      }
    })
  });
  req.write(JSON.stringify(data));
  req.end();
  return deferred.promise;
};

module.exports = ElasticSearch;
