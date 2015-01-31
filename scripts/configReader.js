var fs = require('fs');
var _ = require('lodash-node');

module.exports = {
  read: function (file) {
    var config;
    var content = fs.readFileSync(file, 'UTF-8');

    var angular = {
      module: function (name) {
        console.log(name);

        return {
          constant: function (name, obj) {
            config = obj;
          }
        };
      }
    };

    eval(content);

    return config;
  },

  getFileList:function(file,dir) {
    var config = this.read(file);

    var category = _(config.categories).find(function (it) {
      return it.dir === dir;
    });

    return _(category.pages).pluck('file').map(function(it) {
      return it.replace(/\.html$/, '.md');
    }).value();
  }
};
