import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "./login_form.css";
import UserPage from "./UserPage";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userData = await response.json();
        // Zapisz dane użytkownika do localStorage
        localStorage.setItem("userData", JSON.stringify(userData));
        //przekerowanie po pomyslnym logowaniu na strone uzytkownika
        navigate(`/userPage`);
        // Ustaw stan zalogowania w komponencie App
        onLogin(userData);
        setError(null);
        console.log("Zalogowano pomyślnie", userData);
      } else {
        // Ustaw błąd w stanie komponentu
        setError("Błędne dane logowania. Spróbuj ponownie.");
        setUserData(null);
        console.error("Błąd podczas logowania");
      }
    } catch (error) {
      // Ustaw błąd w stanie komponentu
      setError(
        "Wystąpił błąd połączenia z serwerem. Spróbuj ponownie później."
      );
      setUserData(null);
      console.error("Błąd połączenia z serwerem:", error);
    }
  };
  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className="container">
      {userData ? (
        <UserPage userData={userData} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button
                onClick={handleLogin}
                type="submit"
                className="button is-primary"
              >
                Log in
              </button>
            </div>
          </div>

          {error && <div className="notification is-danger">{error}</div>}

          {userData && (
            <div className="notification is-success">
              Zalogowano pomyślnie jako {userData.name} {userData.surname}.
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
