import React, { PropTypes } from 'react';
import AceEditor from 'react-ace-async';

import * as playgroundBoilerplates from '../resources/playgroundBoilerplates';

import './Playground.scss';


class Playground extends React.Component {

  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleRunPlayground = this.handleRunPlayground.bind(this);
    this.handleSavePlayground = this.handleSavePlayground.bind(this);
  }

  handleRunPlayground() {
    const value = this.refs.PlaygroundEditor.editor.getValue();
    console.log('run', value);
  }

  handleSavePlayground() {
    // @TODO
  }

  render() {
    const { language } = this.props;

    return (
      <div className="Playground">
        <div className="Playground-leftSide">
          <div className="Playground-explanation jumbotron">
            <h1>The Palindrome dilema</h1>
            <h2>Write an algorithm that tests if a string is a palindrome.</h2>
            <p><b>Palindrome:</b> A palindrome is a word, phrase, number, or other
            sequence of characters which reads the same backward or forward.
            Allowances may be made for adjustments to capital letters,
            punctuation, and word dividers.</p>
            <span>Examples:</span>
            <ul>
              <li>"Race car"</li>
              <li>"Was it a car or a cat I saw?"</li>
              <li>"A man, a plan, a canal, Panama!"</li>
            </ul>
          </div>
          <AceEditor
            className="Playground-editor form-control"
            id="Playground-editor"
            ref="PlaygroundEditor"
            theme="monokai"
            mode={language}
            value={playgroundBoilerplates[language]}
          />
        </div>
        <div className="Playground-rightSide">
          <div className="Playground-result">
            <div className="Playground-resultPreview">
              <AceEditor
                className="Playground-resultPreview form-control"
                id="Playground-resultPreview"
                theme="monokai"
                mode="io"
              />
              <div className="Playground-resultTime">
              </div>
            </div>
          </div>
          <div className="Playground-actions">
            <button
              className="Playground-actions-run form-control btn-warning"
              onClick={this.handleRunPlayground}
            >
              Run
            </button>
            <button
              className="Playground-actions-run form-control btn-primary"
              onClick={this.handleSavePlayground}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Playground;
