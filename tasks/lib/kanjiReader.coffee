Converter = require('csvtojson').Converter
fs = require('fs')
_ = require('lodash')
Q = require('q')
XmlStream = require 'xml-stream'

class KanjiReader

  constructor: (options)->
    @options = {
      constructResult: true,
      delimiter: ','
    }
    _.assign @options, options

  csvToJSON: (file)->
    return this.exists(file)
    .then ()->
      deferred = Q.defer()
      stream = fs.createReadStream file
      csvConverter = new Converter(@options)
      csvConverter.on 'end_parsed', (data)->
        deferred.resolve data

      stream.pipe csvConverter
      return deferred.promise

  exists: (file)->
    deferred = Q.defer()

    fs.exists file, (exists)->
      if exists
        deferred.resolve file
      else
        deferred.reject "#{file} not found"

    return deferred.promise

  xmlToJson: (grunt, input, output, jouyou, done)->
    self = this
    ENCODING = 'UTF8'

    delimiter = ''
    nbKanji = 0

    xml = new XmlStream(input)

    xml.collect('kanji');
    xml.collect('reading');
    xml.collect('meaning');


    output.write '['

    xml.on 'endElement:kanji', (kanji)->
      if kanji.jouyou isnt jouyou.toString()
        return
      output.write delimiter + JSON.stringify({
          id: Number(kanji.kask)
          char: kanji.$.char
          readings: self.extractReadings(kanji.reading)
          meanings: self.extractMeanings(kanji.meaning)
        }) + '\n', ENCODING
      delimiter = ','
      nbKanji++

    xml.on 'end', ()->
      output.end ']', ()->
        grunt.log.debug "Wrote #{nbKanji} kanji"
        done();

  extractReadings: (readings)->
    _(readings)
    .map (reading) ->
      {
      text: reading.$text
      type: reading.$.type
      }
    .groupBy('type')
    .mapValues (list) ->
      _(list).pluck('text').value()
    .value()

  extractMeanings: (meanings)->
    _(meanings).pluck('$text').value()


module.exports = KanjiReader
