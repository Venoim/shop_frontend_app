import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./UserSidebarSytle.scss";

const UserSidebar = ({ onLogout }) => {
  return (
    <aside className="menu">
      <p className="menu-label">Twoje konto</p>
      <ul className="menu-list">
        <li className="selected">
          <Link to="/user/orders">Twoje zamówienia</Link>
        </li>
        <li className="selected">
          <Link to="/user/data">Twoje dane</Link>
        </li>
        <li className="selected">
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
