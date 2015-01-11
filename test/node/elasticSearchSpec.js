'use strict';

var ElasticSearch = require('../../scripts/elasticsearch');
var nock = require('nock');
var http = require('http');

describe('ElasticSearch Spec', function () {
  var elasticSearch, grunt;

  beforeEach(function () {
    grunt = jasmine.createSpy('grunt');
    grunt.log = jasmine.createSpyObj('log', ['ok', 'error']);
    grunt.log.ok.andCallFake(function (msg) {
      console.log('OK:' + msg);
    });
    grunt.log.error.andCallFake(function (msg) {
      console.log('ERROR:' + msg);
    });

    elasticSearch = new ElasticSearch('nihongo', {
      hostname: 'localhost',
      port: 9200
    }, grunt);

    nock.disableNetConnect();
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

  it('Should index all files from configuration file', function (done) {
    nock('http://localhost:9200').persist().filteringPath(/\/\d+$/g, '/XX').put('/nihongo/article/XX').reply(200,
      {"_index": "nihongoXXX", "_type": "articleXXX", "_id": "XXXX", "_version": 1, "created": true});

    spyOn(elasticSearch.configReader, 'read').andCallThrough();
    spyOn(elasticSearch, 'indexFile').andCallThrough();

    elasticSearch.indexFilesFromConfig('test/data/config.js').then(function (id) {
      expect(id).toBe(6);
      console.log('All files loading OK');
      expect(elasticSearch.configReader.read).toHaveBeenCalledWith('test/data/config.js');
      expect(elasticSearch.indexFile).toHaveBeenCalled();
      expect(elasticSearch.indexFile.callCount).toBe(6);
      expect(grunt.log.ok.callCount).toBe(6);
      done();
    }).fail(function (err) {
      console.log('All files loading failure ' + err);
      expect(true).toBe(false);
      done();
    });
  });

  it('Should index file', function (done) {
    var id = 0;

    nock('http://localhost:9200').filteringRequestBody(function (path) {
      return '*';
    }).put('/nihongo/article/' + id).reply(200, id);
    elasticSearch.indexFile('test/data/page01.html', 'category', 'page', id).then(function (result) {
      expect(result).toEqual(id);
      done();
    }).catch(function (e) {
      console.log(e);
      done();
    });
  });

  it('Should fail on server error', function (done) {
    var id = 1;

    nock('http://localhost:9200').put('/nihongo/article/' + id).reply(500);

    elasticSearch.indexFile('test/data/page01.html', 'category', 'page', id).then(function (result) {
      expect(true).toBe(false);
      done();
    }).catch(function (e) {
      expect(e.statusCode).toBe(500);
      done();
    });
  });

  it('Should fail reading invalid file', function (done) {
    elasticSearch.indexFile('unknown.html', 'category', 'page', 'blah').then(function (result) {
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

  it('Should filter single kanji ruby', function () {
    var result = elasticSearch.filter('<ruby class="kanji"><rb>小</rb><rp>(</rp><rt>しょう</rt><rp>)</rp></ruby>');

    expect(result).toBe('小');
  });

  it('Should filter ruby style 1', function () {
    var result = elasticSearch.filter('<p>マリーは<ruby><rb>新しい</rb><rp>【</rp><rt>あたらしい</rt><rp>】</rp></ruby>ペンフレンドに<ruby><rb>手紙</rb><rp>【</rp><rt>てがみ</rt><rp>】</rp></ruby>をかきまた。</p>');

    expect(result).toBe('<p>マリーは新しいペンフレンドに手紙をかきまた。</p>');
  });
  it('Should filter ruby style 2', function () {
    var result = elasticSearch.filter('<li><ruby><rb>妹</rb><rp>(</rp><rt>いもうと</rt><rp>)</rp></ruby>は<ruby><rb>小</rb><rp>(</rp><rt>しょう</rt><rp>)</rp></ruby>' +
    '<ruby><rb>学</rb><rp>(</rp><rt>がく</rt><rp>)</rp></ruby><ruby><rb>生</rb><rp>(</rp><rt>せい</rt><rp>)</rp></ruby>ですから、　ランドセルをもっています。 <br />');

    expect(result).toBe('<li>妹は小学生ですから、　ランドセルをもっています。 <br />');
  });
});
