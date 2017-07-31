var webpack = require('webpack');
var path = require('path');
require('babel-polyfill');
require('babel-loader');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    './stylesheets/style.scss',
    './client/client.js'
  ],
  watch: true,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'client.min.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'client', 'stylesheets'],
    extensions: ['', '.js', '.scss']
  },
  module: {
    loaders: [
      {
        // Only run .js and .jsx files through Babel
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "client"),
        exclude: path.resolve(__dirname, "node_modules"),

        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-runtime', 'transform-decorators-legacy']
        }
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=[path][name].[ext]" },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "stylesheets"),
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
