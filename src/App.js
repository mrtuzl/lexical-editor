import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
// import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import Toolbar from './Toolbar';

import './App.css';
// import './theme.css';

const editorConfig = {
  namespace: 'MyEditor',
  onError: (error) => {
    console.error(error);
  },
  nodes: [],
};

const onChange = (editorState) => {
  editorState.read(() => {
    // JSON formatında editor state alabilirsiniz
    const json = editorState.toJSON();
    console.log(json);
  });
};

function App() {
  return (
    <div className="App">
      <h1>Lexical Editor</h1>
      <LexicalComposer initialConfig={editorConfig}>
        <Toolbar />
        <div className="editor-container">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            // placeholder={<div className="editor-placeholder">Start typing...</div>}
            // ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={onChange} />
        </div>
      </LexicalComposer>
    </div>
  );
}

export default App;