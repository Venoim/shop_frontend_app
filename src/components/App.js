import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Body/Home.js";
import Heading from "./Heading/Heading";
import LoginForm from "./Body/login_form";
import Dashboard from "./Body/Dashboard.js";
import RegistrationForm from "./Body/registration_form";
import ProductPage from "./Body/ProductPage";
import UserPage from "./Body/UserPage"; // Dodajemy import komponentu UserPage
import "./App.css";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // Dodajemy stan dla danych użytkownika

  useEffect(() => {
    // Sprawdź, czy istnieją dane zalogowanego użytkownika w localStorage
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
    // Usuń dane zalogowanego użytkownika z localStorage po wylogowaniu
    localStorage.removeItem("userData");
  };

  return (
    <Router>
      <div>
        <Heading isUserLoggedIn={isUserLoggedIn} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route
              path="/login"
              element={<LoginForm onLogin={handleLogin} />}
            />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/userPage"
              element={<UserPage userData={userData} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Dashboard />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
