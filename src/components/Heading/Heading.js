// Heading.js
import React from "react";
import "bulma/css/bulma.min.css";

const Heading = ({ isUserLoggedIn, onLogout }) => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="#">
          Sklep React
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="#" className="navbar-item">
            Produkty
          </a>
          <a href="#" className="navbar-item">
            Koszyk
          </a>
        </div>

        <div className="navbar-end">
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
              <a className="navbar-link">Twoje konto</a>

              <div className="navbar-dropdown">
                <a className="navbar-item" href="#">
                  Profil
                </a>
                <a className="navbar-item" href="#">
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
