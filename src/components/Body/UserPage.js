import React from "react";
import UserSidebar from "./Sidebar/UserSidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrdersPage from "./UserMenu/OrdersPage.js";
import DataPage from "./UserMenu/DataPage.js";
import AccountSettingsPage from "./UserMenu/AccountSettingsPage.js";
import "bulma/css/bulma.min.css";
import "./UserPageStyle.scss";

const UserPage = ({ userData, onLogout }) => {
  if (!userData) {
    return <div>Nie jesteś zalogowany</div>;
  }

  const { name, surname, email, id } = userData.userData;

  return (
    <div className="columns">
      <div className="column is-one-quarter">
        <UserSidebar onLogout={onLogout} />
      </div>
      <div className="container">
        <div className="content page">
          <h2 className="title">Profil użytkownika</h2>
          <p>
            <strong>ID:</strong> {id} <strong>Email:</strong> {email}
          </p>
        </div>
        <Routes>
          <Route
            path="/orders"
            element={<OrdersPage currentUserData={userData} />}
          />
          <Route
            path="/data"
            element={<DataPage currentUserData={userData} />}
          />
          <Route path="/set" element={<AccountSettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserPage;
