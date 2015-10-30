http = require('http')
configReader = require('./configReader')
Q = require('q')
fs = require('fs')
getSlug = require('speakingurl')

class ElasticSearch

  constructor: (options, grunt) ->
    @index = options.index
    @hostname = options.hostname
    @port = options.port
    @configReader = configReader
    @auth = options.auth
    @grunt = grunt

  ###

###
  toctoc: ()->
    deferred = Q.defer()
    options =
      hostname: @hostname
      port: @port
      path: '/'
      method: 'GET'


    req = http.request options, (res) ->
      if res.statusCode isnt 200
        deferred.reject
          statusCode: res.statusCode
        return

      res.on 'data', (chunk) ->
        deferred.resolve JSON.parse(chunk.toString())

    req.on 'error', (e) ->
      deferred.reject e

    req.end()
    return deferred.promise

  ###

###
  indexFile: (file, category, page) ->
    deferred = Q.defer()
    self = this
    id = "#{getSlug(category.title)}-#{getSlug(page.title)}"

    content = undefined

    try
      content = fs.readFileSync file, 'UTF-8'
    catch e
      # Invalid file or file not found
      deferred.reject e
      return deferred.promise

    filtered = this.filter content

    entry =
      french: filtered
      japanese: filtered
      uri: self.getUrl(category.title, page.title)
      category: category.title
      page: page.title

    options =
      hostname: @hostname
      port: @port
      path: "/#{@index}/article/#{id}"
      method: 'PUT'

    # Basic Authentification
    if @auth
      options.auth = "#{@auth.user}:#{@auth.password}"

    req = http.request options, (res) ->
      if res.statusCode isnt 200 && res.statusCode isnt 201
        deferred.reject {statusCode: res.statusCode}
        self.logError "Error indexing : #{file}"

      res.on 'data', (chunk)->
        console.log chunk.toString()
        deferred.resolve(chunk.toString())

    req.write JSON.stringify(entry)
    req.end()

    return deferred.promise

  ###
  ###
  indexFilesFromConfig: (configFile, nb, grunt) ->
    config = configReader.read configFile
    self = this
    result = Q ->

    entries = []

    for category in config.categories
      for page in category.pages
        entries.push {category: category, page: page}

    if nb and nb <= entries.length
      entries = entries[entries.length - nb..]

    for entry in entries
      file = "app/#{entry.category.dir}/#{entry.page.file}";
      console.log file
      result = result.then ->
        self.indexFile file, entry.category, entry.page

    return result

  ###

###
  getUrl: (categoryTitle, pageTitle)->
    "#/#{getSlug(categoryTitle)}/#{getSlug(pageTitle)}";

  filter: (content) ->
    content.replace /<ruby( class="kanji")?><rb>([^<]+)<\/rb><rp>.<\/rp><rt>[^<]+<\/rt><rp>.<\/rp><\/ruby>/ig, '$2'

  logOK: (msg) ->
    if @grunt
      @grunt.log.ok msg
    else
      console.log "OK:#{msg}"

  logError: (msg) ->
    if @grunt
      @grunt.log.error msg
    else
      console.log "ERROR:#{msg}"

  init: () ->
    deferred = Q.defer()
    # TODO convert index_mapping to json file
    data = require('./../index_mapping')

    options =
      hostname: @hostname,
      port: @port,
      path: "/#{@index}"
      method: 'PUT'

    #Basic Authentification
    if @auth
      options.auth =  "#{@auth.user}:#{@auth.password}"

    req = http.request options, (res) ->
      res.on 'data', (chunk) ->
        if res.statusCode isnt 200 && res.statusCode isnt 201
          deferred.reject chunk.toString()
        else
          deferred.resolve chunk.toString()

    req.write JSON.stringify(data)
    req.end()

    return deferred.promise

  #
  # Set
  #
  setAlias: () ->
    options =
      hostname: this.hostname
      port: this.port
      path: '/_aliases'
      method: 'POST'

    #Basic Authentification
    if(@auth)
      options.auth = "#{@auth.user}:#{@auth.password}"

    data =
      actions: [
        add:
          index: this.index
          alias: 'nihongo'
      ]

    deferred = Q.defer()
    req = http.request options, (res) ->
      res.on 'data', (chunk) ->
        if res.statusCode isnt 200 && res.statusCode isnt 201
          deferred.reject chunk.toString()
        else
          deferred.resolve chunk.toString()

    req.write JSON.stringify(data)
    req.end()
    return deferred.promise

module.exports = ElasticSearch;
