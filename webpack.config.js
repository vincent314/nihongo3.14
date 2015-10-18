var webpack = require('webpack');

module.exports = {
  entry: './app/scripts/app.js',
  output: {
    path: __dirname + '/app/webpack/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })]
};
