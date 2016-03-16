import request from 'superagent';


export function testCode(language, code) {
  return new Promise((resolve, reject) => {
    request.post('/api/test-code')
      .send({ language, code })
      .end((err, result) => {
        if (err) {
          return reject();
        }
        return resolve(result.body);
      });
  });
}
