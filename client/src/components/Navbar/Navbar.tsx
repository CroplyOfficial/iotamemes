import React from "react";
import { Link } from "react-router-dom";
import { DiscordLoginButton } from "./DiscordLoginButton";
import "./Header.css";

interface IProps {
  extraLink?: JSX.Element;
}
const Navbar = ({ extraLink }: IProps) => {
  return (
    <nav
      className="navbar is-warning"
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
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start"></div>

          <div className="navbar-end">
            <div className="navbar-item">
              <Link to="/memes" className="has-text-dark">
                Memes
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/artists" className="has-text-dark">
                Artists
              </Link>
            </div>
            <div className="navbar-item">
              {extraLink || <DiscordLoginButton />}
            </div>
          </div>
        </div>
      </div>
    </nav>

    // <header>
    //   <Link to="/">
    //     <img src="/images/logo.png" alt="IOTAMemes Logo" className="logo" />
    //   </Link>
    //   <div classNameName="links">
    //     <Link to="/artists">Artists</Link>
    //     <Link to="/memes">Memes</Link>
    //   </div>
    // </header>
  );
};

export default Navbar;
