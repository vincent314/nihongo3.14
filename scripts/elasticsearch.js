var http = require('http');
var extend = require('extend');
var configReader = require('./configReader');
var Q = require('q');
var fs = require('fs');
var getSlug = require('speakingurl');

function ElasticSearch(index,options) {
  this.options = options;
  this.index = index;
  this.configReader = configReader;
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
    if(res.statusCode !== 200){
      deferred.reject({statusCode:res.statusCode});
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
ElasticSearch.prototype.indexFile = function (file, uri, id) {
  var deferred = Q.defer();
  var content;
  try{
    content = fs.readFileSync(file, 'UTF-8');
  }catch(e){
    // Invalid file or file not found
    deferred.reject(e);
    return deferred.promise;
  }

  var entry = {};
  entry.french = content;
  entry.japanese = content;
  entry.uri = uri;

  var options = extend({path: '/' + this.index + '/article/' + id, method: 'PUT'}, this.options);

  var req = http.request(options, function (res) {
    if(res.statusCode !== 200) {
      deferred.reject({statusCode:res.statusCode});
    }

    res.on('data', function (chunk) {
      deferred.resolve(JSON.parse(chunk.toString()));
    });
  });

  req.write(JSON.stringify(entry));
  req.end();

  return deferred.promise;
};

/**
 *
 * @param configFile
 */
ElasticSearch.prototype.indexFilesFromConfig = function (configFile) {
  var config = configReader.read(configFile);
  var self = this;
  var id=0;


  config.categories.forEach(function (category) {
    category.pages.forEach(function (page) {
      var file = 'app/' + category.dir + '/' + page.file;
      self.indexFile(file,self.getUrl(category.title,page.title),id).then(function(response){
        console.log(file + ' indexed : ' + JSON.stringify(response));
      }).fail(function(err){
        console.log('ERROR : ' + JSON.stringify(err));
      });
      id++;
    });
  })
};

ElasticSearch.prototype.getUrl = function(categoryTitle, pageTitle){
  return '#/' + getSlug(categoryTitle) + '/' + getSlug(pageTitle);
};

module.exports = ElasticSearch;
