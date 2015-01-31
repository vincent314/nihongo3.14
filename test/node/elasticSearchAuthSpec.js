xdescribe('Test ElasticSearch with authentication', function () {

  var ElasticSearch = require('../../scripts/elasticsearch');
  var nock = require('nock');

  beforeEach(function () {
    //nock('http://localhost:9200',{}).filteringPath(/\/\d+$/g, '/XX').put('/nihongo/article/XX')
    //  .reply(200, {"_index": "nihongoXXX", "_type": "articleXXX", "_id": "XXXX", "_version": 1, "created": true});
  });

  xit('Test authentication OK', function (done) {
    nock.recorder.rec({
      dont_print: true,
      enable_reqheaders_recording: true
    });
    var options = {
      host: 'localhost',
      port:9200
    };
    //var auth = {
    //  user:'admin',
    //  password:'PaSsWoRd'
    //};
    var auth = {
      user:'superuser',
      password:'Adm1n'
    };

    var es = new ElasticSearch('nihongo',options,null,auth);

    es.indexFile('test/data/page01.html', 'test', 'page01', 1).then(function (idx) {
      expect(idx).toBe(1);
      done();
    }).fail(function (err) {
      console.log(err);
      expect(err).not.toBeDefined();
      done();
    });
  });

  it('Test init OK', function (done) {
    var options = {
      host: 'localhost',
      port:9200
    };
    //var options = {
    //  host: 'elastic-vmn.rhcloud.com',
    //  port:80
    //};
    var auth = {
      user:'superuser',
      password:'Adm1n'
    };

    var es = new ElasticSearch('/nihongo',options,null,auth);

    es.init().then(function (result) {
      console.log(result);
      done();
    }).fail(function (err) {
      console.log(err);
      done();
    });
  });
});
