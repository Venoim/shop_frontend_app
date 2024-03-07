"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("bulma/css/bulma.min.css");
var beach_bag_7703453_png_1 = __importDefault(require("../../../images/icons/beach-bag_7703453.png"));
var Header = function (_a) {
    var isUserLoggedIn = _a.isUserLoggedIn, onLogout = _a.onLogout;
    return (<nav className="navbar is-dark" role="navigation" aria-label="main navigation">
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
            <img src={beach_bag_7703453_png_1.default} alt="Torba plażowa" title="Ikona autorstwa Freepik" style={{ width: "32px", height: "auto" }}/>
          </a>
          {!isUserLoggedIn ? (<div className="navbar-item">
              <div className="buttons">
                <a href="/login" className="button is-primary">
                  <strong>Zaloguj się</strong>
                </a>
                <a href="/register" className="button is-light">
                  Rejestracja
                </a>
              </div>
            </div>) : (<div className="navbar-item has-dropdown is-hoverable">
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
                <hr className="navbar-divider"/>
                <a className="navbar-item" href="#" onClick={onLogout}>
                  Wyloguj się
                </a>
              </div>
            </div>)}
        </div>
      </div>
    </nav>);
};
exports.default = Header;
