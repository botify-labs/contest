import React, { PropTypes } from 'react';

import './LanguageChooser.scss';

export default class LanguageChooser extends React.Component {

  static propTypes = {
    onChoose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleChooseJs = this.handleChooseJs.bind(this);
    this.handleChoosePython = this.handleChoosePython.bind(this);
    this.handleChooseGo = this.handleChooseGo.bind(this);
  }

  componentWillMount() {
    document.body.className += 'color-orange';
  }

  componentWillUnmount() {
    document.body.className = document.body.className.replace('color-orange', '');
  }

  handleChooseJs() {
    this.props.onChoose('javascript');
  }

  handleChoosePython() {
    this.props.onChoose('python');
  }

  handleChooseGo() {
    this.props.onChoose('golang');
  }

  render() {
    return (
      <div className="LanguageChooser">
        <h1>Choose your side</h1>
        <div className="LanguageChooser-choice">
          <button onClick={this.handleChooseJs}>JS</button>
          <span>vs</span>
          <button onClick={this.handleChoosePython}>Python</button>
          <span>vs</span>
          <button onClick={this.handleChooseGo}>Go</button>
        </div>
      </div>
    );
  }
}
