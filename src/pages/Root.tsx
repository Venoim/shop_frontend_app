import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CommonLayout from "../components/layout/CommonLayout";
import Header from "../components/layout/header/Header";
import Home from "./Home/Home";
import ProductPage from "./Product/ProductPage";
import Dashboard from "./Dashboard/Dashboard";
import LoginForm from "./Login/login_form";
import UserPage from "./User/UserPage";
import RegistrationForm from "./Registration/registration_form";
import EmailVerificationForm from "./ConfirmEmail/email_verification_form";
import Basket from "./Basket/Basket";
import { UserData } from "../types";
import "./Root.css";

function Root() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData: UserData = JSON.parse(storedUserData);
      setIsUserLoggedIn(true);
      setUserData(parsedUserData);
    }
  }, []);

  const handleLogin = (userData: UserData) => {
    setIsUserLoggedIn(true);
    setUserData(userData);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("userData");
  };

  return (
    <Router>
      <CommonLayout
        header={
          <Header isUserLoggedIn={isUserLoggedIn} onLogout={handleLogout} />
        }
        footer={null}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product/:id"
            element={<ProductPage userData={userData} />}
          />
          <Route path="/products" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route
            path="/user/*"
            element={
              userData ? (
                <UserPage
                  userData={userData.userData}
                  onLogout={handleLogout}
                />
              ) : null
            }
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/confirm-email" element={<EmailVerificationForm />} />
          <Route
            path="/basket"
            element={<Basket userData={userData ? userData.userData : null} />}
          />
        </Routes>
      </CommonLayout>
    </Router>
  );
}

export default Root;
