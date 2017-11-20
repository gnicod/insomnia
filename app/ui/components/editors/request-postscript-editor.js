import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import KeyValueEditor from '../key-value-editor/editor';
import CodeEditor from '../codemirror/code-editor';
import {trackEvent} from '../../../analytics/index';
import allHeaderNames from '../../../datasets/header-names';
import allCharsets from '../../../datasets/charsets';
import allMimeTypes from '../../../datasets/content-types';
import allEncodings from '../../../datasets/encodings';

@autobind
class PostScriptEditor extends PureComponent {
  _handleBulkUpdate (headersString) {
  }

  _handleTrackToggle (pair) {
    trackEvent('Headers Editor', 'Toggle', pair.disabled ? 'Disable' : 'Enable');
  }

  _handleTrackCreate () {
    trackEvent('Headers Editor', 'Create');
  }

  _handleTrackDelete () {
    trackEvent('Headers Editor', 'Delete');
  }

  render () {
    const {
      bulk,
      headers,
      editorFontSize,
      editorIndentSize,
      editorLineWrapping,
      onChange,
      testScript,
      handleRender,
      handleGetRenderContext,
      nunjucksPowerUserMode
    } = this.props;

    return (
        <div className="tall">
          <CodeEditor
            getRenderContext={handleGetRenderContext}
            render={handleRender}
            mode='javascript'
            nunjucksPowerUserMode={nunjucksPowerUserMode}
            fontSize={editorFontSize}
            indentSize={editorIndentSize}
            lineWrapping={editorLineWrapping}
            onChange={onChange}
            defaultValue={testScript}
          />
        </div>
    );
  }
}

PostScriptEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  bulk: PropTypes.bool.isRequired,
  editorFontSize: PropTypes.number.isRequired,
  editorIndentSize: PropTypes.number.isRequired,
  editorLineWrapping: PropTypes.bool.isRequired,
  nunjucksPowerUserMode: PropTypes.bool.isRequired,
  handleRender: PropTypes.func.isRequired,
  handleGetRenderContext: PropTypes.func.isRequired,
  headers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired
};

export default PostScriptEditor;
