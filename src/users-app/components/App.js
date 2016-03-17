import React from 'react';
import AceEditor from 'react-ace-async';
import cx from 'classnames';
import { getUsers } from '../resources/api';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      selectedUser: null,
      thresholds: {
        javascript: 300,
        python: 200,
        golang: 100,
      },
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

  updateThreshold(language, value) {
    this.setState({
      thresholds: {
        ...this.state.thresholds,
        [language]: value,
      },
    });
  }

  render() {
    const { users, selectedUser, thresholds } = this.state;

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
        <div className="App-users App-leftSide">
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
                    className={cx(
                      selectedUser && selectedUser.id === user.id && 'active',
                      user.time - thresholds[language] < usersByLanguage[language][0].time && 'info',
                    )}
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
        <div className="App-rightSide">
          <div className="App-winnerPick">
            <h3>Threshold</h3>
            <form>
              {languages.map(language =>
              <div className="form-group">
                <label>{language}</label>
                <input
                  type="number"
                  className="form-control"
                  value={thresholds[language]}
                  step="10"
                  onChange={(e) => this.updateThreshold(language, e.target.value)}
                />
              </div>
              )}
              <button className="btn btn-primary" onClick={this.pickWinner}>Pick Winner</button>
            </form>
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
      </div>
    );
  }
}
