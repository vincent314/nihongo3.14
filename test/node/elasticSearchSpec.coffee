describe 'ElasticSearch Spec', ->
  ElasticSearch = require('../../scripts/elasticsearch')
  nock = require('nock')
  http = require('http')

  elasticSearch = undefined
  grunt = undefined
  INDEX = 'nihongo_20140117'

  beforeEach ->
    grunt = jasmine.createSpy 'grunt'
    grunt.log = jasmine.createSpyObj 'log', ['ok', 'error']
    grunt.log.ok.andCallFake (msg) ->
      console.log 'OK:' + msg
    grunt.log.error.andCallFake (msg)->
      console.log 'ERROR:' + msg

    elasticSearch = new ElasticSearch
      hostname: 'localhost',
      port: 9200,
      index: INDEX
    , grunt

    nock.disableNetConnect()

  afterEach ->
    nock.cleanAll()


  ###
  Test ElasticSearch ping
###
  it 'Should toctoc ElasticSearch', (done)->
    nock('http://localhost:9200').get('/').reply 200,
      "status": 200,
      "name": "Tyrannus",
      "cluster_name": "elasticsearch",
      "version":
        "number": "1.4.1",
        "build_hash": "89d3241d670db65f994242c8e8383b169779e2d4",
        "build_timestamp": "2014-11-26T15:49:29Z",
        "build_snapshot": false,
        "lucene_version": "4.10.2"
      "tagline": "You Know, for Search"

    elasticSearch.toctoc().then (result) ->
      expect(result).toBeDefined()
      expect(result.status).toBe(200)
      done()
    .fail (e)->
      expect(e).toBeUndefined()
      done()

  ###
  Test reading configuration file and index all files in there
###
  it 'Should index all files from configuration file', (done) ->
    nock('http://localhost:9200').persist().filteringPath(/\/[\w\d-]+$/g, '/XX')
    .put('/' + INDEX + '/article/XX')
    .reply 200,
      "_index": "nihongoXXX", "_type": "articleXXX", "_id": "XXXX", "_version": 1, "created": true

    spyOn(elasticSearch.configReader, 'read').andCallThrough()
    spyOn(elasticSearch, 'indexFile').andCallThrough()

    elasticSearch.indexFilesFromConfig('test/data/config.js', 1).then ->
      console.log 'All files loading OK'
      expect(elasticSearch.configReader.read).toHaveBeenCalledWith('test/data/config.js')
      expect(elasticSearch.indexFile).toHaveBeenCalled()
      expect(elasticSearch.indexFile.callCount).toBe(1)
      done()
    .fail (err) ->
      console.log 'All files loading failure ' + err
      expect(true).toBe false
      done()

  ###
  Read a configuration file and index only last nb documents
###
  it 'Should index all files with nb from configuration file', (done) ->
    nock('http://localhost:9200').persist().filteringPath(/\/[\w\d-]+$/g, '/XX')
    .put('/' + INDEX + '/article/XX')
    .reply 200,
      "_index": "nihongoXXX", "_type": "articleXXX", "_id": "XXXX", "_version": 1, "created": true

    spyOn(elasticSearch.configReader, 'read').andCallThrough()
    spyOn(elasticSearch, 'indexFile').andCallThrough()

    elasticSearch.indexFilesFromConfig('test/data/config.js').then ->
      console.log 'All files loading OK'
      expect(elasticSearch.configReader.read).toHaveBeenCalledWith 'test/data/config.js'
      expect(elasticSearch.indexFile).toHaveBeenCalled()
      expect(elasticSearch.indexFile.callCount).toBe 6
      done()
    .fail (err)->
      console.log 'All files loading failure ' + err
      expect(true).toBe false
      done()

  ###
  Test indexing one file
###
  it 'Should index file', (done) ->
    nock('http://localhost:9200').filteringRequestBody((path)-> '*')
    .put('/' + INDEX + '/article/category-page')
    .reply 200, ''

    elasticSearch.indexFile('test/data/page01.html', {title: 'category'}, {title: 'page'})
    .then ->
      done()
    .catch (e)->
      console.log e
      done()

  ###
  Test a serveur error
###
  it 'Should fail on server error', (done) ->
    nock('http://localhost:9200').put('/' + INDEX + '/article/category-page')
    .reply 500

    elasticSearch.indexFile('test/data/page01.html', {title: 'category'}, {title: 'page'}).then ->
      expect(true).toBe false
      done()
    .catch (e)->
      expect(e.statusCode).toBe 500
      done()

  ###
  Test reading en invalid file
###
  it 'Should fail reading invalid file', (done)->
    elasticSearch.indexFile('unknown.html', {title: 'category'}, {title: 'page'}).then (result)->
      expect(true).toBe false
      done()
    .catch (e)->
      expect(e.code).toBe 'ENOENT'
      done()

  ###
  Test building the page URL
###
  it 'Should build URL', ->
    result = elasticSearch.getUrl 'catégorie title', 'page title'
    expect(result).toBe '#/categorie-title/page-title'

  ###
  Test filtering Kanji
###
  it 'Should filter single kanji ruby', ->
    result = elasticSearch.filter '<ruby class="kanji"><rb>小</rb><rp>(</rp><rt>しょう</rt><rp>)</rp></ruby>'
    expect(result).toBe '小'

  ###
  Test filtering ruby style 1
###
  it 'Should filter ruby style 1', ->
    result = elasticSearch.filter '<p>マリーは<ruby><rb>新しい</rb><rp>【</rp><rt>あたらしい</rt><rp>】</rp></ruby>ペンフレンドに<ruby><rb>手紙</rb><rp>【</rp><rt>てがみ</rt><rp>】</rp></ruby>をかきまた。</p>'
    expect(result).toBe '<p>マリーは新しいペンフレンドに手紙をかきまた。</p>'

  ###
  Test filtering ruby style 2
###
  it 'Should filter ruby style 2', ->
    result = elasticSearch.filter '<li><ruby><rb>妹</rb><rp>(</rp><rt>いもうと</rt><rp>)</rp></ruby>は<ruby><rb>小</rb><rp>(</rp><rt>しょう</rt><rp>)</rp></ruby>' +
      '<ruby><rb>学</rb><rp>(</rp><rt>がく</rt><rp>)</rp></ruby><ruby><rb>生</rb><rp>(</rp><rt>せい</rt><rp>)</rp></ruby>ですから、　ランドセルをもっています。 <br />'
    expect(result).toBe '<li>妹は小学生ですから、　ランドセルをもっています。 <br />'


  ###
  Test index initialisation
###
  it 'Should init index', (done)->
    nock('http://localhost:9200').put('/' + INDEX)
    .reply 200, JSON.stringify
      acknowledge: true

    elasticSearch.init().then (result)->
      expect(result).toBe JSON.stringify
        acknowledge: true
      done()

  ###
  Test setting index alias
###
  it 'Should set alias', (done)->
    nock('http://localhost:9200').post('/_aliases').reply 200, JSON.stringify
      acknowledge: true

    elasticSearch.setAlias().then (result)->
      expect(result).toBe JSON.stringify({acknowledge: true})
      done()
