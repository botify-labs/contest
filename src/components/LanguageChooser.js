import React, { PropTypes } from 'react';


export default class LanguageChooser extends React.Component {

  static propTypes = {
    onChoose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleChooseJs = this.handleChooseJs.bind(this);
    this.handleChoosePython = this.handleChoosePython.bind(this);
  }

  handleChooseJs() {
    this.props.onChoose('javascript');
  }

  handleChoosePython() {
    this.props.onChoose('python');
  }

  render() {
    return (
      <div className="LanguageChooser">
        <h2>Choose your side</h2>
        <div className="LanguageChooser-choice">
          <button onClick={this.handleChooseJs}>JS</button>
          <span>vs</span>
          <button onClick={this.handleChoosePython}>Python</button>
        </div>
      </div>
    );
  }
}