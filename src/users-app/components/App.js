import React from 'react';
import AceEditor from 'react-ace-async';
import { getUsers } from '../resources/api';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null,
    };
  }

  componentDidMount() {
    getUsers().then(users => {
      users.push({
        id: -1,
        name: 'toto',
        email: 'boo',
        language: 'python',
        time: 30,
        code: 'dzqzdzqqdz',
      });
      this.setState({
        users,
      });
    });
  }

  selectUser(user) {
    this.setState({
      selectedUser: user,
    });
  }

  render() {
    const { users, selectedUser } = this.state;

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
              key={language}
              className={`App-users-${language}`}
              style={{ width: `${100 / languages.length}%` }}
            >
              <h2>{language}</h2>
              <table className="App-users-table table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                {usersByLanguage[language].map(user =>
                  <tr
                    key={user.id}
                    className={selectedUser && selectedUser.id === user.id && 'active'}
                    onClick={() => this.selectUser(user)}
                  >
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
        {selectedUser &&
          <AceEditor
            className="App-userCode form-control"
            id="App-userCode"
            theme="monokai"
            mode={selectedUser.language}
            value={selectedUser.code}
            tabSize={2}
          />
        }
      </div>
    );
  }
}
