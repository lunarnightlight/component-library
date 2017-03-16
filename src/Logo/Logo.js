<<<<<<< HEAD
import React from 'react';

if (typeof require.ensure !== 'function') require.ensure = (d,c) => c(require);
=======
import React, { PropTypes } from 'react';
import isClient from '../utils/isClient';

const styles = {
  height: '80px',
  width: 'auto',
};

const Logo = ({ alt }) => (isClient && <img style={styles} src={require('../../assets/civic-logo-animated-invert.svg')} alt={alt} />);
>>>>>>> 68c412a29a62b930b1ec497f8027779ca0d66dcc

const Logo = () => {
  const svg = require.ensure([], require => require('../../assets/civic-logo.svg'));
  
  return (
    <div>
    {svg}
    </div>
  );
  
}
  
export default Logo;