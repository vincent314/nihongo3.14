_ = require 'underscore'

module.exports = (grunt)->
  grunt.registerMultiTask 'csvToJson', 'Convert a csv file to a json file', ()->
    done = this.async()
    KanjiReader = require './lib/kanjiReader'
    kanjiReader = new KanjiReader()

    grunt.log.debug "Reading CSV file #{this.data.src}"

    kanjiReader.csvToJSON(this.data.src).then (data)->
      grunt.file.write 'app/docs/kanji/kanji.json', JSON.stringify(data)
      done()
    .catch (err)->
      grunt.log.error err
      done()


  grunt.registerMultiTask 'xmlToJson', 'Convert the xml Kanji file to json file', ()->
    XmlStream = require 'xml-stream'
    fs = require 'fs'
    self = this
    done = this.async()

    ENCODING = 'UTF8'

    grunt.log.debug "Opening file #{this.data.src} for reading"
    input = fs.createReadStream(this.data.src)

    grunt.log.debug "Opening file #{this.data.dest} for writing"
    output = fs.createWriteStream(this.data.dest)

    delimiter = ''
    nbKanji = 0

    xml = new XmlStream(input)

    xml.collect('kanji');
    xml.collect('reading');
    xml.collect('meaning');


    output.write '['

    xml.on 'endElement:kanji', (kanji)->
      if kanji.jouyou isnt self.data.jouyou.toString()
        return

      output.write(delimiter + JSON.stringify({
        char: kanji.$.char
        readings: _(kanji.reading).map((reading)->
          {
          text: reading.$text,
          romaji: reading.$.romaji
          type: reading.$.type
          }),
        meanings: _(kanji.meaning).map((meaning)->
          meaning.$text)
      }) + '\n',ENCODING)

      delimiter = ','
      nbKanji++

    xml.on 'end', ()->
      output.end ']',()->
        grunt.log.debug "Wrote #{nbKanji} kanji"
        done();
