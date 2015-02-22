fs = require 'fs'
_ = require('lodash-node');

module.exports =
  read: (file) ->
    content = fs.readFileSync file, 'UTF-8'
    config = undefined

    angular =
      module: (name) ->
        return (
          constant: (name, obj)->
            config = obj
        )
    eval content
    config


  getFileList:(file,dir)->
    config = this.read(file);
    category = _(config.categories).find (it) -> it.dir == dir
    return _(category.pages).pluck('file').map((it) -> it.replace(/\.html$/, '.md')).value()
