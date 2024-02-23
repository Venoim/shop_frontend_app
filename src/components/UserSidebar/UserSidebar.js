import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "../ProductsSidebar/SidebarStyle.scss"; // Wykorzystujemy style z SidebarStyle.scss

const UserSidebar = ({ onLogout }) => {
  const location = useLocation(); // Pobieramy aktualną ścieżkę URL

  return (
    <aside className="menu sidebar">
      {" "}
      {/* Dodajemy klasę sidebar */}
      <p className="menu-label">Twoje konto</p>
      <ul className="menu-list">
        <li className={location.pathname === "/user/orders" ? "selected" : ""}>
          {" "}
          {/* Sprawdzamy, czy aktualna ścieżka jest "/user/orders" */}
          <Link to="/user/orders">Twoje zamówienia</Link>
        </li>
        <li className={location.pathname === "/user/data" ? "selected" : ""}>
          {" "}
          {/* Sprawdzamy, czy aktualna ścieżka jest "/user/data" */}
          <Link to="/user/data">Twoje dane</Link>
        </li>
        <li className={location.pathname === "/user/set" ? "selected" : ""}>
          {" "}
          {/* Sprawdzamy, czy aktualna ścieżka jest "/user/set" */}
          <Link to="/user/set">Ustawienia konta</Link>
        </li>
      </ul>
      <p className="menu-label">Operacje</p>
      <ul className="menu-list">
        <li>
          <a onClick={onLogout}>Wyloguj</a>
        </li>
      </ul>
    </aside>
  );
};

export default UserSidebar;
