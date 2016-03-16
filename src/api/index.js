import { exec } from 'child_process';
import { writeFileSync } from 'fs';
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

  let stdout = '';
  switch(language) {
    case 'javascript':
      writeFileSync('/tmp/contest/test.js', code)
      const startTime = new Date();
      stdout = exec('docker run -t --rm -v /tmp/contest:/contest botify/contest/js', (err, stdout) => {
        const executionTime = new Date() - startTime;
        res.json({
          success: err !== null ? false : true,
          timeMs: executionTime,
          stdout: stdout,
        });
      })
      break;
  }
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
