/* eslint no-var: 0, prefer-template: 0, max-len: 0 */

var path = require('path');
var webpack = require('webpack');


var srcPath = path.resolve(__dirname, './src');
var npmPath = path.resolve(__dirname, './node_modules');

var autoprefixerConfig = {
  browsers: [
    'Firefox > 27',
    'Chrome > 20',
    'Explorer > 9',
    'Safari > 6',
    'Opera > 11.5',
    'iOS > 6.1',
  ],
};
var sassConfig = {
  outputStyle: 'compressed',
  includePaths: [npmPath],
};
var fontConfig = {
  name: 'fonts/[name].[ext]',
};

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'contest-app': [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      './src/contest-app/index',
    ],
    'users-app': [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      './src/users-app/index',
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [srcPath, npmPath],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer?' + JSON.stringify(autoprefixerConfig), 'sass?' + JSON.stringify(sassConfig)],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'autoprefixer?' + JSON.stringify(autoprefixerConfig)],
      },
      { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?' + JSON.stringify(fontConfig) },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?' + JSON.stringify(fontConfig) },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?' + JSON.stringify(fontConfig) },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?' + JSON.stringify(fontConfig) },
      {
        test: /\.txt$/,
        loaders: ['raw'],
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'src'),
          /react-ace-async/,
        ],
      },
    ],
  },
};
