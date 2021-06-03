import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

const Header = ({ orgName }) => {
  // use state to set mobile navbar status where
  //    -> True : Navbar Open
  //    -> False : Navbar Closed
  const [navIsOpen, setNavIsOpen] = useState(false);

  const dispatch = useDispatch();

  const navbarHandler = () => {
    if (navIsOpen) {
      setNavIsOpen(false);
    } else {
      setNavIsOpen(true);
    }
  };

  const logoutHandler = () => {
    closeNav();
    dispatch(logout());
  };

  const closeNav = () => {
    if (navIsOpen) {
      setNavIsOpen(false);
    }
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <header>
      <div className='logo'>
        <Link to='/' onClick={closeNav}>
          <span className='branding'>{orgName}</span>
        </Link>
      </div>
      <div className='links'>
        <div className='desktop'>
          <div className='link'>
            {userInfo ? (
              <Link to='/settings' onClick={closeNav}>
                Welcome, {userInfo.name.split(' ')[0]}!
              </Link>
            ) : (
              <Link to='/login' onClick={closeNav}>
                Login
              </Link>
            )}
          </div>
        </div>
        <div className='mobile'>
          <svg
            onClick={navbarHandler}
            viewBox='0 0 100 80'
            width='40'
            height='40'
          >
            <rect width='80' height='5'></rect>
            <rect y='25' width='80' height='5'></rect>
            <rect y='50' width='80' height='5'></rect>
          </svg>
        </div>
      </div>
      <div
        className='mobNav'
        id='mobileNav'
        style={{ right: navIsOpen ? '0vw' : '-125vw' }}
      >
        <div className='links'>
          {userInfo ? (
            <>
              <Link to='/settings' onClick={closeNav}>
                Settings
              </Link>
              <Link onClick={logoutHandler} to='#'>
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link to='/login' onClick={closeNav}>
                Login
              </Link>
              <Link to='/register' onClick={closeNav}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  orgName: 'Example',
};

export default Header;
