import React from 'react';
import PropTypes from 'prop-types';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import "../styles/CodeBox.css";

const CodeBox = ({ code }) => {
  return (
    <div className="codeBox">
      <SyntaxHighlighter language="html" style={docco}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

CodeBox.propTypes = {
  code: PropTypes.string.isRequired,
};

export default CodeBox;
