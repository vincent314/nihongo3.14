module.exports = (grunt)->

  grunt.registerMultiTask 'csvToJson','Convert a csv file to a json file', ()->
    KanjiReader = require './lib/kanjiReader'
    kanjiReader = new KanjiReader()

    grunt.log.debug "Reading CSV file #{this.data.src}"
    kanjiReader.csvToJSON this.data.src, (data)->
#      grunt.file.write 'app/docs/kanji/kanji.json',data
      grunt.log.debug JSON.stringify(data)
