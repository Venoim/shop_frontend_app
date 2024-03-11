import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import beachBagIcon from "../../../images/icons/beach-bag_7703453.png";

interface HeaderProps {
  isUserLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isUserLoggedIn, onLogout }) => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          React Store
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="/products" className="navbar-item">
            Products
          </a>
        </div>

        <div className="navbar-end">
          <a href="/basket" className="navbar-item">
            <img
              src={beachBagIcon}
              alt="Torba plażowa"
              title="Ikona autorstwa Freepik"
              style={{ width: "32px", height: "auto" }}
            />
          </a>
          {!isUserLoggedIn ? (
            <div className="navbar-item">
              <div className="buttons">
                <a href="/login" className="button is-primary">
                  <strong>Log in</strong>
                </a>
                <a href="/register" className="button is-light">
                  Registration
                </a>
              </div>
            </div>
          ) : (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/user">
                Your account
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item" href="/user">
                  Profile
                </a>
                <a className="navbar-item" href="/user/orders">
                  Orders
                </a>
                <a className="navbar-item" href="/user/set">
                  Settings
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="#" onClick={onLogout}>
                  log out
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
