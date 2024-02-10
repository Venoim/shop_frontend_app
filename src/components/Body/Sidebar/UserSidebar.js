import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./SidebarStyle.scss";

const UserSidebar = ({ onLogout }) => {
  return (
    <aside className="menu">
      <p className="menu-label">Twoje konto</p>
      <ul className="menu-list">
        <li>
          <Link to="/user/zamowienia">Twoje zamówienia</Link>
        </li>
        <li>
          <Link to="/user/dane">Twoje dane</Link>
        </li>
        <li>
          <Link to="/user/ustawienia">Ustawienia konta</Link>
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
