const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/main.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/build/',
    index: 'index.html',
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /(node_modules)/,
      },
    ],
  },
};
