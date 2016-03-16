import React, { PropTypes } from 'react';
import AceEditor from 'react-ace-async';
import cx from 'classnames';

import { testCode } from '../resources/mock';
import * as playgroundBoilerplates from '../resources/playgroundBoilerplates';

import './Playground.scss';


class Playground extends React.Component {

  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    const { language } = this.props;
    this.state = {
      editorValue: playgroundBoilerplates[language],
      testing: false,
      result: null,
      bestResult: null,
    };

    this.handleRunPlayground = this.handleRunPlayground.bind(this);
    this.handleSavePlayground = this.handleSavePlayground.bind(this);
  }

  handleRunPlayground() {
    const { language } = this.props;
    const editorValue = this.refs.PlaygroundEditor.editor.getValue();

    this.setState({
      editorValue,
      testing: true,
    });

    testCode(language, editorValue).then((result) => {
      const { bestResult } = this.state;
      this.setState({
        result,
        testing: false,
        bestResult: !bestResult || result.timeMs < bestResult.timeMs ? result : bestResult,
      });
    });
  }

  handleSavePlayground() {
    // @TODO
  }

  render() {
    const { language } = this.props;
    const { editorValue, testing, result, bestResult } = this.state;

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
            value={editorValue}
          />
        </div>
        <div className="Playground-rightSide">
          <div className="Playground-result">
            {result &&
              <AceEditor
                className="Playground-resultPreview"
                id="Playground-resultPreview"
                theme="monokai"
                mode="io"
                value={result.stdout}
              />
            }
            {result &&
              <div
                className={cx(
                  'Playground-resultTime',
                  result.success ? 'success' : 'danger'
                )}
              >
                {result.success ? `${result.timeMs} ms` : 'Tests failed'}
              </div>
            }
          </div>
          <div className="Playground-actions">
            <button
              className="Playground-actions-run form-control btn-warning"
              onClick={this.handleRunPlayground}
            >
              Run
            </button>
            <button
              className={cx(
                'Playground-actions-save form-control',
                bestResult && bestResult.success && 'btn-primary',
              )}
              onClick={this.handleSavePlayground}
              disabled={!bestResult || !bestResult.success}
            >
              Save
              {bestResult && bestResult.success &&
                <span>{`(best time: ${bestResult.timeMs} ms)`}</span>
              }
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Playground;
