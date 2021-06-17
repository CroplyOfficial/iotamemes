import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <img src='/images/logo.png' alt='IOTAMemes Logo' className='logo' />
      </Link>
      <div className='links'>
        <Link to='/artists'>Artists</Link>
        <Link to='/memes'>Memes</Link>
      </div>
    </header>
  );
};

export default Header;
