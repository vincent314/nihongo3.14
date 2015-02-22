module.exports = (grunt)->

  grunt.registerMultiTask 'csvToJson','Convert a csv file to a json file', ()->
    done = this.async()
    KanjiReader = require './lib/kanjiReader'
    kanjiReader = new KanjiReader()

    grunt.log.debug "Reading CSV file #{this.data.src}"

    kanjiReader.csvToJSON(this.data.src).then (data)->
      grunt.file.write 'app/docs/kanji/kanji.json',JSON.stringify(data)
      done()
    .catch (err)->
      grunt.log.error err
      done()
