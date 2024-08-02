import React from 'react';
import PropTypes from 'prop-types';
import "../styles/CodeBox.css";

const CodeBox = ({ code }) => {
  return (
    <div className='codeBox'>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

CodeBox.propTypes = {
  code: PropTypes.string.isRequired,
};

export default CodeBox;
