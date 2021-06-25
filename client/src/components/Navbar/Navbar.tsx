import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AvatarDropdown } from "./AvatarDropdown";
import { DiscordLoginButton } from "./DiscordLoginButton";
import IotaButton from '../../components/IotaButton/IotaButton';
import "./Header.css";

interface IProps {
  isLoggedIn?: any;
}
const Navbar = ({ isLoggedIn }: IProps) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  //const [classNames, setClassNames] = useState({menu: "", burger: ""})

  const handleOnClick = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const isActiveClass = "is-active";
  const classNames = hamburgerOpen ? isActiveClass : "";
  return (
    <nav
      className="navbar is-warning is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container is-widescreen">
        <div className="navbar-brand">
          <Link to="/" className="">
            <img
              src="/images/logo.png"
              alt="IOTAMemes Logo"
              width="274"
              height="57"
            />
          </Link>
          <a
            role="button"
            className={"navbar-burger " + classNames}
            onClick={handleOnClick}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={"navbar-menu " + classNames}>
          <div className="navbar-start"></div>

          <div className="navbar-end">
            <div className="navbar-item">
              <Link to="/" className="has-text-dark" onClick={handleOnClick}>
                Memes
              </Link>

            </div>
            <div className="navbar-item">
              <Link
                to="/artists"
                className="has-text-dark"
                onClick={handleOnClick}
              >
                Artists
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/about" className="has-text-dark" onClick={handleOnClick}>
                About
              </Link>

            </div>
            <div className="navbar-item">
            </div>

            {isLoggedIn ? (
              <>
                <IotaButton
                  text="Donate to IOTA Memes"
                  address="iota1qplr8pw4tu24jdagkleqvp28rwsdfhx9cgcuaxvjaz5zd9gx9u50vg2v7md"
                  style={{
                    height: '40px',
                    fontSize: '1.1rem',
                    background: '#ffac60',
                    margin: '12.5px 10px',
                    borderRadius: '20px',
                  }}
                />
                <AvatarDropdown user={isLoggedIn} />
              </>
            ) : (
              <DiscordLoginButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
