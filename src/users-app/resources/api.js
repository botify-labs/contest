import request from 'superagent';


export function getUsers() {
  return new Promise((resolve, reject) => {
    request.get('/api/users')
      .end((err, result) => {
        if (err) {
          return reject();
        }
        return resolve(result.body);
      });
  });
}
