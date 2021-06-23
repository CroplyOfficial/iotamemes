import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { DiscordLoginButton } from './DiscordLoginButton';
import './Header.css';
import IotaButton from '../../components/IotaButton/IotaButton';


interface IProps {
  isLoggedIn?: any;
}
const Navbar = ({ isLoggedIn }: IProps) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  //const [classNames, setClassNames] = useState({menu: "", burger: ""})
  
  const handleOnClick = () => {
    setHamburgerOpen(!hamburgerOpen);

    /*
     * let {menu, burger} = classNames;
    let newState = {...classNames};
    if(menu === "is-active") {
      newState.burger = "";
      newState.menu = "";
    }
    else {
      newState.burger = "is-active";
      newState.menu = "is-active";
    }


    setClassNames({...newState});
     */
  }

  const isActiveClass = "is-active";
  const classNames = hamburgerOpen ? isActiveClass : "";
  return (
    <nav
      className='navbar is-warning'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='container is-widescreen'>
        <div className='navbar-brand'>
          <Link to='/' className=''>
            <img
              src='/images/logo.png'
              alt='IOTAMemes Logo'
              width='274'
              height='57'
            />
          </Link>
          <a
            role='button'
            className={'navbar-burger ' + classNames}
            onClick={handleOnClick}
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div id='navbarBasicExample' className={'navbar-menu ' + classNames}>
          <div className='navbar-start'></div>

          <div className='navbar-end'>
            <div className='navbar-item'>
              <Link 
                to='/' className='has-text-dark'
                onClick={handleOnClick}
              >
                Memes
              </Link>
            </div>
            <div className='navbar-item'>
              <Link 
                to='/artists' 
                className='has-text-dark'
                onClick={handleOnClick}
              >
                Artists
              </Link>
            </div>
            <div className='navbar-item'>
              <Link 
                to='/about' 
                className='has-text-dark'
                onClick={handleOnClick}
              >
                About
              </Link>
            </div>

          
            
            {isLoggedIn && isLoggedIn.isAdmin && (
              <div className='navbar-item'>
                <Link 
                  to="/flags"
                  className="has-text-dark"
                  onClick={handleOnClick}
                >
                  Reports
                </Link>
              </div>
            )}

            <div>


              {isLoggedIn ? (
                <>
                <Link 

                    to='/settings'
                    onClick={handleOnClick}
                  >
                    <img
                      style={{
                        height: '45px',
                        width: '45px',
                        borderRadius: '22.5px',
                        marginTop: '7.5px',
                        marginLeft: '15px',
                      }}
                      src={isLoggedIn.avatar}
                    />
                  </Link>
                </>
              ) : (
                <DiscordLoginButton />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
