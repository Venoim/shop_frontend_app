import React, { useState, useEffect } from "react";
import UserSidebar from "../../components/Body/Sidebar/UserSidebar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OrdersPage from "../../components/Body/UserMenu/OrdersPage.js";
import DataPage from "../../components/Body/UserMenu/DataPage.js";
// import AccountSettingsPage from "./UserMenu/AccountSettingsPage.js";
import "bulma/css/bulma.min.css";
import "./UserPageStyle.scss";

const UserPage = ({ userData: userState, onLogout }) => {
  // Stan do przechowywania danych użytkownika
  const [userData, setUserData] = useState(null);

  // Efekt pobierający dane użytkownika
  useEffect(() => {
    if (userState) {
      const { id } = userState.userData;
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/users/${id}`);
          if (response.ok) {
            const userDataFromServer = await response.json();
            setUserData(userDataFromServer);
          } else {
            console.error(
              "Wystąpił błąd podczas pobierania danych użytkownika."
            );
          }
        } catch (error) {
          console.error(
            "Wystąpił błąd podczas pobierania danych użytkownika:",
            error
          );
        }
      };

      fetchUserData();
    }
  }, [userState]);

  // Renderowanie komponentu
  if (!userState) {
    return <div>Nie jesteś zalogowany</div>;
  }

  const { name, surname, email, id } = userState.userData;

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
            element={<OrdersPage currentUserData={userState} />}
          />
          <Route
            path="/data"
            element={<DataPage currentUserData={userState} />}
          />
          {/* <Route path="/set" element={<AccountSettingsPage />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default UserPage;
