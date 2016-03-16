import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.dev';
import api from './src/api';

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.use('/public', express.static('public'));

app.use('/api', api);

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/users-app/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/contest-app/index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
