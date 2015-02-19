Converter = require('csvtojson').core.Converter
fs = require('fs')
_ = require('lodash')

class KanjiReader

  constructor:(options)->
    @options = {
      constructResult: true,
      delimiter:','
    }
    _.assign @options,options

  csvToJSON: (file, callback)->
    stream = fs.createReadStream file
    csvConverter = new Converter(@options)
    csvConverter.on 'end_parsed', callback
    stream.pipe csvConverter

module.exports = KanjiReader
