import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Body/Home.js";
import Heading from "./Heading/Heading";
import LoginForm from "./Body/login_form";
import Dashboard from "./Body/Dashboard.js";
import RegistrationForm from "./Body/registration_form";
// import Sidebar from "./Body/Sidebar/Sidebar.js";
import "./App.css";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsUserLoggedIn(true);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
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
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
