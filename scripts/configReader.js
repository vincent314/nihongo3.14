var fs = require('fs');

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
  }
};
