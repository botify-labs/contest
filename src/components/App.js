import React from 'react';
import LanguageChooser from './LanguageChooser';
import Playground from './Playground';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      language: null,
    };
    this.handleLanguageSelection = this.handleLanguageSelection.bind(this);
  }

  handleLanguageSelection(language) {
    this.setState({
      language,
    });
  }

  renderContent() {
    const { language } = this.state;

    if (!language) {
      return (
        <LanguageChooser onChoose={this.handleLanguageSelection} />
      );
    }

    return (
      <Playground language={language} />
    );
  }

  render() {
    return (
      <div className="App">
        { this.renderContent() }
      </div>
    );
  }
}