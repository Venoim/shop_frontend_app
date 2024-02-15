import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import beachBagIcon from "./beach-bag_7703453.png";

const Heading = ({ isUserLoggedIn, onLogout }) => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          Sklep React
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="/products" className="navbar-item">
            Produkty
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
                  <strong>Zaloguj się</strong>
                </a>
                <a href="/register" className="button is-light">
                  Rejestracja
                </a>
              </div>
            </div>
          ) : (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/user">
                Twoje konto
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item" href="/user">
                  Profil
                </a>
                <a className="navbar-item" href="/user/orders">
                  Zamowienia
                </a>
                <a className="navbar-item" href="/user/set">
                  Ustawienia
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="#" onClick={onLogout}>
                  Wyloguj się
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Heading;
