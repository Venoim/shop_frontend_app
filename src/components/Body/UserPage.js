import React from "react";
import UserSidebar from "./Sidebar/UserSidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrdersPage from "./UserMenu/OrdersPage.js";
import ProfilePage from "./UserMenu/ProfilePage.js";
import AccountSettingsPage from "./UserMenu/AccountSettingsPage.js";

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
        <Routes>
          <Route path="/user/zamowienia" element={<OrdersPage />} />
          <Route path="/user/dane" element={<ProfilePage />} />
          <Route path="/user/ustawienia" element={<AccountSettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserPage;
