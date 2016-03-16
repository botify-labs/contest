import React from 'react';
import LanguageChooser from './LanguageChooser';
import Playground from './Playground';
import Inscription from './Inscription';
import ThankYou from './ThankYou';

import 'bootstrap/dist/css/bootstrap.css';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language: null,
      result: null,
      registered: false,
    };
    this.handleLanguageSelection = this.handleLanguageSelection.bind(this);
    this.handlePlaygroundSave = this.handlePlaygroundSave.bind(this);
    this.handleRegistered = this.handleRegistered.bind(this);
  }

  handleLanguageSelection(language) {
    this.setState({
      language,
    });
  }

  handlePlaygroundSave(result) {
    this.setState({
      result,
    });
  }

  handleRegistered() {
    this.setState({
      registered: true,
    });
  }

  renderContent() {
    const { language, result, registered } = this.state;

    if (!language) {
      return (
        <LanguageChooser onChoose={this.handleLanguageSelection} />
      );
    }

    if (!result) {
      return (
        <Playground language={language} onSave={this.handlePlaygroundSave} />
      );
    }

    if (!registered) {
      return (
        <Inscription language={language} result={result} onRegistered={this.handleRegistered} />
      );
    }

    return <ThankYou />
  }

  render() {
    return (
      <div className="App container-fluid">
        { this.renderContent() }
      </div>
    );
  }
}
