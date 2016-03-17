import React from 'react';
import { getUsers } from '../resources/api';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    getUsers().then(users => {
      users.push({
        name: 'toto',
        email: 'boo',
        language: 'python',
        time: 30,
      });
      this.setState({
        users,
      });
    });
  }

  render() {
    const { users } = this.state;
    const usersByLanguage = users.reduce((res, user) => {
      if (!res[user.language]) {
        res[user.language] = []; // eslint-disable-line no-param-reassign
      }
      res[user.language].push(user);
      return res;
    }, {});
    const languages = Object.keys(usersByLanguage);

    return (
      <div className="App container-fluid">
        <div className="App-users">
          {languages.map(language =>
            <div
              className={`App-users-${language}`}
              style={{ width: `${100 / languages.length}%` }}
            >
              <h2>{language}</h2>
              <table className="table table-striped App-users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                {usersByLanguage[language].map((user, i) =>
                  <tr key={`${user.name}-${i}`}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.time} ms</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}
