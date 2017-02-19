var webpack = require('webpack');
var path = require('path');
require('babel-polyfill');
require('babel-loader');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    './stylesheets/style.scss',
    './js/index.js',
    'webpack-dev-server/client?http://127.0.0.1:8080'
  ],
  watch: true,
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        // Only run .js and .jsx files through Babel
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules"),

        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-runtime', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
