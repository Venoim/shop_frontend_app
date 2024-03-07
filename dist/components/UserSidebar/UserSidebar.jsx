"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
require("bulma/css/bulma.min.css");
require("../ProductsSidebar/SidebarStyle.scss"); // Wykorzystujemy style z SidebarStyle.scss
var UserSidebar = function (_a) {
    var onLogout = _a.onLogout;
    var location = (0, react_router_dom_1.useLocation)(); // Pobieramy aktualną ścieżkę URL
    return (<aside className="menu sidebar">
      {" "}
      {/* Dodajemy klasę sidebar */}
      <p className="menu-label">Twoje konto</p>
      <ul className="menu-list">
        <li className={location.pathname === "/user/orders" ? "selected" : ""}>
          {" "}
          {/* Sprawdzamy, czy aktualna ścieżka jest "/user/orders" */}
          <react_router_dom_1.Link to="/user/orders">Twoje zamówienia</react_router_dom_1.Link>
        </li>
        <li className={location.pathname === "/user/data" ? "selected" : ""}>
          {" "}
          {/* Sprawdzamy, czy aktualna ścieżka jest "/user/data" */}
          <react_router_dom_1.Link to="/user/data">Twoje dane</react_router_dom_1.Link>
        </li>
        <li className={location.pathname === "/user/set" ? "selected" : ""}>
          {" "}
          {/* Sprawdzamy, czy aktualna ścieżka jest "/user/set" */}
          <react_router_dom_1.Link to="/user/set">Ustawienia konta</react_router_dom_1.Link>
        </li>
      </ul>
      <p className="menu-label">Operacje</p>
      <ul className="menu-list">
        <li>
          <a onClick={onLogout}>Wyloguj</a>
        </li>
      </ul>
    </aside>);
};
exports.default = UserSidebar;
