import React, { PropTypes } from 'react';
import AceEditor from 'react-ace-async';


class Playground extends React.Component {

  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editorValue: null,
    };
    this.handleEditorValueChange = this.handleEditorValueChange.bind(this);
    this.handleRunPlayground = this.handleRunPlayground.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Avoid useless renders on editorValue state update.
    if (this.state.editorValue !== nextState.editorValue) {
      return false;
    }
    return true;
  }

  handleEditorValueChange(value) {
    this.setState({
      editorValue: value,
    });
  }

  handleRunPlayground() {
    console.log('run');
  }

  render() {
    const { language } = this.props;

    return (
      <div className="Playground">
        <div className="Playground-leftSide">
          <div className="Playground-explanation">
            <h2>The Palindrome dilema</h2>
            <p>
              Write the algorithm to test if a string is a palindrome.<br />
              <b>Palindrome:</b> A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward. Allowances may be made for adjustments to capital letters, punctuation, and word dividers. 
              Examples:
              - "Race car",
              - "Was it a car or a cat I saw?"
              - "A man, a plan, a canal, Panama!"
            </p>
          </div>
          <AceEditor
            className="Playground-editor form-control"
            id="Playground-editor"
            theme="monokai"
            mode={language}
            onChange={this.handleEditorValueChange}
          />
        </div>
        <div className="Playground-rightSide">
          <div className="Playground-resultPreview">
          </div>
          <div className="Playground-actions">
            <button onClick={this.handleRunPlayground} className="Playground-actions-run">
              Run
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Playground;
