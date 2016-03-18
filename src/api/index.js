import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import { Router } from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('botify-contest');
const api = new Router();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());


api.post('/test-code', (req, res) => {
  const { language, code } = req.body;

  let codeFile;
  let dockerImage;
  switch(language) {
    case 'javascript':
      codeFile = 'tmp/test.js';
      dockerImage = 'botify/contest/js';
      break;
    case 'python':
      codeFile = 'tmp/test.py';
      dockerImage = 'botify/contest/python';
      break;
    case 'golang':
      codeFile = 'tmp/test.go';
      dockerImage = 'botify/contest/golang';
  }

  writeFileSync(codeFile, code);
  const startTime = new Date();
  exec('docker run -t --rm -v $(pwd)/tmp:/contest ' + dockerImage, (err, stdout) => {
    const executionTime = new Date() - startTime;
    res.json({
      success: err === null,
      timeMs: executionTime,
      stdout,
    });
    if (err) {
      console.error(stdout);
    }
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
    db.all('SELECT * FROM Users ORDER BY time ASC', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        res.json(rows);
      }
    });
  });
});


export default api;
