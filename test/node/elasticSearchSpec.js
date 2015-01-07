'use strict';

var ElasticSearch = require('../../scripts/elasticsearch');
var nock = require('nock');
var http = require('http');

describe('ElasticSearch Spec', function () {
  var elasticSearch;

  beforeEach(function () {
    elasticSearch = new ElasticSearch('nihongo', {
      hostname: 'localhost',
      port: 9200
    });
  });

  afterEach(function () {
    nock.cleanAll();
  });

  it('Should toctoc ElasticSearch', function (done) {
    nock('http://localhost:9200').get('/').reply(200, {
      "status": 200,
      "name": "Tyrannus",
      "cluster_name": "elasticsearch",
      "version": {
        "number": "1.4.1",
        "build_hash": "89d3241d670db65f994242c8e8383b169779e2d4",
        "build_timestamp": "2014-11-26T15:49:29Z",
        "build_snapshot": false,
        "lucene_version": "4.10.2"
      },
      "tagline": "You Know, for Search"
    });

    elasticSearch.toctoc().then(function (result) {
      expect(result).toBeDefined();
      expect(result.status).toBe(200);
      done();
    }).fail(function (e) {
      expect(e).toBeUndefined();
      done();
    });
  });

  it('Should index file', function (done) {
    var id = 'page01';

    var mock = {
      "_index": "nihongo",
      "_type": "article",
      "_id": id,
      "_version": 1,
      "created": true
    };

    nock('http://localhost:9200').put('/nihongo/article/page01').reply(200, mock);

    elasticSearch.indexFile('test/data/page01.html', 'category/page', id).then(function (result) {
      expect(result).toEqual(mock);
      done();
    }).catch(function (e) {
      console.log(e);
      done();
    });
  });

  it('Should fail on server error', function (done) {
    var id = 'page01';

    nock('http://localhost:9200').put('/nihongo/article/page01').reply(500);

    elasticSearch.indexFile('test/data/page01.html', 'category/page', id).then(function (result) {
      expect(true).toBe(false);
      done();
    }).catch(function (e) {
      expect(e.statusCode).toBe(500);
      done();
    });
  });

  it('Should fail reading invalid file', function (done) {
    elasticSearch.indexFile('unknown.html', 'category/page', 'blah').then(function (result) {
      expect(true).toBe(false);
      done();
    }).catch(function (e) {
      expect(e.code).toBe('ENOENT');
      done();
    });
  });

  it('Should build URL', function () {
    var result = elasticSearch.getUrl('catégorie title', 'page title');
    expect(result).toBe('#/categorie-title/page-title');
  });

  it('Should index all files from configuration file',function() {
    nock('http://localhost:9200').filteringPath(/\d+^/, 'XX').put('/nihongo/article/XX').reply(200,
      {"_index":"nihongoXXX","_type":"articleXXX","_id":"XXXX","_version":1,"created":true});

    spyOn(elasticSearch.configReader, 'read').andCallThrough();
    spyOn(elasticSearch, 'indexFile').andCallThrough();

    //nock.recorder.rec();
    elasticSearch.indexFilesFromConfig('app/scripts/config.js');

    expect(elasticSearch.configReader.read).toHaveBeenCalledWith('app/scripts/config.js');
    expect(elasticSearch.indexFile).toHaveBeenCalled();
    expect(elasticSearch.indexFile.callCount).toBe(100);
  });
});
