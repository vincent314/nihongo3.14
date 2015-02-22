Converter = require('csvtojson').core.Converter
fs = require('fs')
_ = require('lodash')
Q = require('q')

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

module.exports = KanjiReader
