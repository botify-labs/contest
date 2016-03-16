/* eslint no-var: 0, no-console:0, func-names:0, prefer-arrow-callback:0 */

require('babel-register');

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var api = require('./src/api');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

// app.use('/api', api);

app.get('/users', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/users-app/index.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'src/contest-app/index.html'));
});

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
