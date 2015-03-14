_ = require 'lodash'
fs = require 'fs'
KanjiReader = require './lib/kanjiReader'

module.exports = (grunt)->
  grunt.registerMultiTask 'csvToJson', 'Convert a csv file to a json file', ()->
    done = this.async()
    kanjiReader = new KanjiReader()

    grunt.log.debug "Reading CSV file #{this.data.src}"

    kanjiReader.csvToJSON(this.data.src).then (data)->
      grunt.file.write 'app/docs/kanji/kanji.json', JSON.stringify(data)
      done()
    .catch (err)->
      grunt.log.error err
      done()


  grunt.registerMultiTask 'xmlToJson', 'Convert the xml Kanji file to json file', ()->
    self = this
    done = this.async()

    grunt.log.debug "Opening file #{this.data.src} for reading"
    input = fs.createReadStream(this.data.src)

    grunt.log.debug "Opening file #{this.data.dest} for writing"
    output = fs.createWriteStream(this.data.dest)

    kanjiReader = new KanjiReader()
    kanjiReader.xmlToJson grunt, input, output, self.data.jouyou, done
