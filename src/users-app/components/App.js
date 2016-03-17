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
      winner: null,
      thresholds: {
        javascript: 300,
        python: 200,
        golang: 100,
      },
    };

    this.pickWinner = this.pickWinner.bind(this);
  }

  componentDidMount() {
    getUsers().then(users => {
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

  pickWinner(e) {
    e.preventDefault();
    const { users, thresholds } = this.state;
    const [usersByLanguage, languages] = processUsers(users, thresholds);

    const usersPoll = [];
    languages.forEach(language => {
      usersByLanguage[language].forEach(user => {
        if (user.canWin) {
          usersPoll.push(user);
        }
      });
    });

    const winner = usersPoll[getRandomInt(0, usersPoll.length)];

    this.setState({
      winner,
      selectedUser: winner,
    });
  }

  render() {
    const { users, selectedUser, winner, thresholds } = this.state;
    const [usersByLanguage, languages] = processUsers(users, thresholds);

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
                        winner && winner.id === user.id ? 'success'
                      : selectedUser && selectedUser.id === user.id ? 'active'
                      : user.canWin ? 'info'
                      : null
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

function processUsers(users, thresholds) {
  const usersByLanguage = users.reduce((res, user) => {
    if (!res[user.language]) {
      res[user.language] = [{
        ...user,
        canWin: true,
      }];
    } else {
      res[user.language].push({
        ...user,
        canWin: user.time - thresholds[user.language] < res[user.language][0].time,
      });
    }
    return res;
  }, {});
  const languages = Object.keys(usersByLanguage);

  return [usersByLanguage, languages];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
