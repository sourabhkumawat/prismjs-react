import React, { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Dark theme for Prism.js
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
  const [html, setHtml] = useState('')
  const [text, setText] = useState('')
  useEffect(() => {
    setText(initialState)
    setHtml(Prism.highlight(initialState, Prism.languages.javascript, 'javascript'))
    Prism.highlightAll();
  }, []);

  const handleChange = (e) => {
    setText(e.target.value)
    setHtml(Prism.highlight(e.target.value, Prism.languages.javascript, 'javascript'))
  }


  return (
    <div style={{ height: '100vh', width: "100vw", position: 'relative' }}>
      <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",

      }} >
        <h1 style={{
          position: 'absolute',
          top: "20%"
        }}>code editor</h1>
        <div style={{
          position: 'absolute',
          top: "30%"
        }}>A simple no-frills code editor with syntax highlighting.</div>
        <pre style={{
          position: 'absolute',
          height: 250,
          width: 500,
          top: "35%",
          bottom: "50%",
          left: "35%",
          backgroundColor: 'transparent',

        }}>
          <div dangerouslySetInnerHTML={{ __html: html }} />

        </pre>
        <textarea
          value={text}
          style={{
            backgroundColor: 'transparent',
            color: 'transparent',
            height: 250,
            width: 500,
            position: 'absolute',
            resize: "none",
            top: "35%",
            bottom: "50%",
            left: "35%"

          }}
          rows={10}
          onChange={handleChange}
        >

        </textarea>
      </div>
    </div>
  );
};

export default SyntaxHighlighting;
