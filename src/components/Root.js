import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home.js";
import Header from "./layout/header/Header.js";
import LoginForm from "./Body/login_form.js";
import Dashboard from "./Body/Dashboard.js";
import RegistrationForm from "./Body/registration_form.js";
import EmailVerificationForm from "./Body/email_verification_form.js";
import ProductPage from "../pages/Product/ProductPage.js";
import Basket from "./Body/Basket.js";
import UserPage from "./Body/UserPage.js";
import "./Root.css";
import Footer from "./layout/footer/Footer.js";

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
