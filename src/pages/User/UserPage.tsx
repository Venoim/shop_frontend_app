import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import UserSidebar from "../../components/UserSidebar/UserSidebar";
import { Route, Routes } from "react-router-dom";
import OrdersPage from "./Orders/OrdersPage";
import DataPage from "./Data/DataPage";
import { User, UserData, UserPageProps } from "../../types";
import "bulma/css/bulma.min.css";
import "./UserPageStyle.scss";

const UserPage: React.FC<UserPageProps> = ({ userData, onLogout }) => {
  const [fetchedUserData, setFetchedUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userData) {
        const { id } = userData;
        try {
          const response = await fetch(`http://localhost:3001/api/users/${id}`);
          if (response.ok) {
            const userDataFromServer = await response.json();
            setFetchedUserData(userDataFromServer);
          } else {
            console.error("An error occurred while retrieving user data.");
          }
        } catch (error) {
          console.error("An error occurred while retrieving user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userData]);

  if (!userData) {
    return <div>You're not logged in</div>;
  }

  const { name, surname, email, id } = userData;

  return (
    <CommonLayout header={null} footer={null}>
      <div className="columns">
        <div className="column is-one-quarter">
          <UserSidebar onLogout={onLogout} />
        </div>
        <div className="container">
          <div className="content page">
            <h2 className="title">User profile</h2>
            <p>
              <strong>ID:</strong> {id} <strong>Email:</strong> {email}
            </p>
          </div>
          <Routes>
            <Route
              path="/orders"
              element={<OrdersPage userData={{ userData: userData }} />}
            />
            <Route path="/data" element={<DataPage userData={userData} />} />
            {/* <Route path="/set" element={<AccountSettingsPage />} /> */}
          </Routes>
        </div>
      </div>
    </CommonLayout>
  );
};

export default UserPage;
