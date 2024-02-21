import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home/Home.js";
import Header from "../components/layout/header/Header.js";
import LoginForm from "./Login/login_form.js";
import Dashboard from "./Dashboard/Dashboard.js";
import RegistrationForm from "./Registration/registration_form.js";
import EmailVerificationForm from "./ConfirmEmail/email_verification_form.js";
import ProductPage from "./Product/ProductPage.js";
import Basket from "./Basket/Basket.js";
import UserPage from "./User/UserPage.js";
import "./Root.css";
import Footer from "../components/layout/footer/Footer.js";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setIsUserLoggedIn(true);
      setUserData(parsedUserData);
    }
  }, []);

  const handleLogin = (userData) => {
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
      <div>
        <Header isUserLoggedIn={isUserLoggedIn} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route
              path="/login"
              element={<LoginForm onLogin={handleLogin} />}
            />
            <Route path="/confirm-email" element={<EmailVerificationForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/user/*"
              element={<UserPage userData={userData} onLogout={handleLogout} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Dashboard />} />
            <Route
              path="/product/:id"
              element={<ProductPage userData={userData} />}
            />
            <Route path="/basket" element={<Basket userData={userData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
