const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', path.join(__dirname, `/src/main.js`)],
  output: {
    path: path.join(__dirname, `/public`),
    filename: `bundle.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.join(__dirname, '/node_modules'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['transform-class-properties', { 'spec': true }],
              ['transform-object-rest-spread']
            ]
          }
        }
      }, {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
