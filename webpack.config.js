'use strict'

var webpack = require('webpack');

module.exports = {
  // cache: true,
  // debug: true,
  // devtool: 'source-map',  
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js',
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react', 'react-hmre'],
        plugins: ["transform-object-rest-spread"]
      }
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
      loader: 'file',
    }]
  },
};
