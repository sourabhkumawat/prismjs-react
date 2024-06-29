import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Dark theme for Prism.js
import 'prismjs/components/prism-javascript'; // Example: include a language definition


const initialState = `
import React from "react";
import ReactDOM from "react-dom";

function App() {
  return (
    <h1>Hello world</h1>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
`

const SyntaxHighlighting = () => {
  const itemRef = useRef(null);

  useEffect(() => {
    itemRef.current.innerHTML = Prism.highlight(initialState, Prism.languages.javascript, 'javascript');
    Prism.highlightAll();
  }, []);

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(itemRef.current);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    const start = preCaretRange.toString().length;
    return start;
  };

  const restoreCursorPosition = (start) => {
    const node = itemRef.current;
    let charIndex = start;
    let range = document.createRange();
    range.setStart(node, 0);
    range.setEnd(node, 0);

    const setRange = (node) => {
      if (node.nodeType === 3) {
        const len = node.nodeValue.length;
        if (charIndex <= len) {
          range.setStart(node, charIndex);
          range.setEnd(node, charIndex);
          return true;
        } else {
          charIndex -= len;
        }
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          if (setRange(child)) {
            return true;
          }
        }
      }
      return false;
    };

    setRange(node);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleInput = () => {
    const start = saveCursorPosition();
    const code = itemRef.current.textContent;
    itemRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    restoreCursorPosition(start);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '\n');
    } else if (e.key === ' ') {
      document.execCommand('insertText', false, ' ');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#2d2d2d' }}>
      <div>
        <h1 style={{
          marginBottom: "20px",
          color: "#fff"
        }}>Code editor</h1>
        <div
          ref={itemRef}
          contentEditable
          suppressContentEditableWarning={true}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            minHeight: '200px',
            width: '600px',
            whiteSpace: 'pre',
            backgroundColor: '#1e1e1e',
            color: '#ffffff',
            fontFamily: 'monospace',
            overflow: 'auto'
          }}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />
      </div>
    </div>
  );
};

export default SyntaxHighlighting;
