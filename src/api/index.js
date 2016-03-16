import { Router } from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { getRandomInt } from './utils';

const db = new sqlite3.Database('botify-contest');
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
  const { name, email, language, timeMs, code } = req.body;

  db.serialize(() => {
    db.run(`INSERT INTO Users VALUES ('${name}', '${email}', '${language}', ${timeMs}, '${code}')`, err => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.status(201).end();
      }
    });
  });
});

api.get('/users', (req, res) => {
  db.serialize(() => {
    db.all('SELECT *, info FROM Users', (err, rows) => {
      res.json(rows);
    });
  });
});


export default api;
