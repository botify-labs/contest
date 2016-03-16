import React, { PropTypes } from 'react';
import emailValidator from 'email-validator';
import { register } from '../resources/api';


import './Inscription.scss';

export default class Inscription extends React.Component {

  static propTypes = {
    language: PropTypes.string.isRequired,
    result: PropTypes.shape({
      timeMs: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
    onRegistered: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentWillMount() {
    document.body.className += 'color-main';
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    const { language, result: { timeMs, code }, onRegistered } = this.props;
    const { name, email } = this.state;
    register({ name, email, language, code, timeMs }).then(() => {
      onRegistered();
    });
  }

  render() {
    const { timeMs } = this.props.result;
    const { name, email } = this.state;
    const formValid = name && emailValidator.validate(email);

    return (
      <div className="Inscription">
        <h1>Bravo ({timeMs} ms)</h1>
        <form>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Name"
              value={name} onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Email (to contact the winner!)"
              value={email} onChange={this.handleEmailChange}
            />
          </div>
          <button
            className="btn"
            disabled={!formValid}
            onClick={this.handleRegister}
          >
            Ride for the prize
          </button>
        </form>
      </div>
    );
  }

}
