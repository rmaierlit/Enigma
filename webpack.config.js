const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'client', 'app.jsx'),
  output: { path: path.join(__dirname, 'client'), filename: 'bundle.js' },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2016', 'react'],
        },
      },
    ],
  },
};
