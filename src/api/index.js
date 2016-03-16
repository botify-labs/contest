import { Router } from 'express';
import bodyParser from 'body-parser';
import { getRandomInt } from './utils';

const api = new Router();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());


api.post('/test-code', (req, res) => {
  const { language, code } = req.body;

  // MOCK
  res.json({
    success: getRandomInt(0, 3) > 0,
    timeMs: getRandomInt(200, 1000),
    stdout: 'BLABLABLABLA',
  });
});

api.post('/register', (req, res) => {
  const { name, email, language, code, timeMs } = req.body;

  res.status(201).end();
});


export default api;
