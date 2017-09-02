const path = require('path');
const webpack = require('webpack');

const settings = {
  entry: path.join(__dirname, 'client', 'app.jsx'),
  output: { path: path.join(__dirname, 'client'), filename: 'bundle.js' },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2016',
            'react',
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]',
            },
          },
          'postcss-loader', // has separate config, see postcss.config.js
        ],
      },
    ],
  },
};

module.exports = settings;
