var webpack = require('webpack');
var path = require('path');

module.exports = {
  //entry: './app/scripts/app2.js',
  //output: {
  //  path: __dirname + '/test/webpack/',
  //  filename: 'bundle.js'
  //},
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })],
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
       //the url-loader uses DataUrls.
       //the file-loader emits files.
      { test: /\.html$/, loader: "ng-cache?prefix=./app/templates"},
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  }
  //devtool:"#inline-source-map"
};
