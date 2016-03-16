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

app.use('/api', api);

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/users-app/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/contest-app/index.html'));
});

// Serve Ace Editor sources locally (it requires files using RequireJS)
app.use(express.static('node_modules/ace-builds/src-min'));

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
