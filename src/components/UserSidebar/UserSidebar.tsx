import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "../ProductsSidebar/SidebarStyle.scss";

interface UserSidebarProps {
  onLogout: () => void;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ onLogout }) => {
  const location = useLocation(); // We get the current URL path

  return (
    <aside className="menu sidebar">
      {" "}
      <p className="menu-label">Your account</p>
      <ul className="menu-list">
        <li className={location.pathname === "/user/orders" ? "selected" : ""}>
          {" "}
          <Link to="/user/orders">Your orders</Link>
        </li>
        <li className={location.pathname === "/user/data" ? "selected" : ""}>
          {" "}
          <Link to="/user/data">Your data</Link>
        </li>
        <li className={location.pathname === "/user/set" ? "selected" : ""}>
          {" "}
          <Link to="/user/set">Account settings</Link>
        </li>
      </ul>
      <p className="menu-label">Operations</p>
      <ul className="menu-list">
        <li>
          <a onClick={onLogout}>Log out</a>
        </li>
      </ul>
    </aside>
  );
};

export default UserSidebar;
