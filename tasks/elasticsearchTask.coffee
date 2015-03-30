module.exports = (grunt)->

  ###
  ESLOAD : Index pages
###
  grunt.registerMultiTask 'esLoad', ()->
    done = this.async()
    ElasticSearch = require './lib/elasticsearch'
    es = new ElasticSearch this.data, grunt

    es.indexFilesFromConfig('app/scripts/config.js', this.data.nb, grunt).then ()->
      grunt.log.ok()
      done()
    .fail (err)->
      grunt.log.error JSON.stringify(err)
      done()


  ###
  ESINIT : Init ElasticSearch Index
###
  grunt.registerMultiTask 'esInit', ()->
    done = this.async()

    ElasticSearch = require './lib/elasticsearch'
    es = new ElasticSearch this.data, grunt
    es.init().then ()->
      return es.setAlias()
    .then (result)->
      grunt.log.ok(result)
      done()
    .fail (err)->
      grunt.log.error "Error:#{JSON.stringify(err)}"
      done()
