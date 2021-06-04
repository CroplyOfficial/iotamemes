import React from 'react';
import './Button.css';

const Button = ({ children, color, background, ...rest }) => {
  return (
    <button
      className='button'
      style={{
        color: color,
        background: background,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: 'white',
  background: '#3d3d3d',
};

export default Button;
