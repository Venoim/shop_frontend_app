import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "./login_form.css";
import UserPage from "./UserPage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        navigate(`/`);
        // Ustaw stan zalogowania w komponencie App
        onLogin(userData);
        setError(null);
        console.log("Zalogowano pomyślnie", userData);
      } else {
        // Ustaw błąd w stanie komponentu
        setError("Błędne dane logowania. Spróbuj ponownie.");
        setUserData(null);
        console.error("Błąd podczas logowania");
        toast.error("Błędne dane logowania. Spróbuj ponownie.");
      }
    } catch (error) {
      // Ustaw błąd w stanie komponentu
      setError(
        "Wystąpił błąd połączenia z serwerem. Spróbuj ponownie później."
      );
      setUserData(null);
      console.error("Błąd połączenia z serwerem:", error);
      toast.error(
        "Wystąpił błąd połączenia z serwerem. Spróbuj ponownie później."
      );
    }
  };
  const handleLogin = () => {
    onLogin();
  };

  return (
    <div className="container">
      <ToastContainer position="bottom-right" />
      {userData ? (
        <UserPage userData={userData} />
      ) : (
        <form className="box loginBox" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                autoComplete="email"
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
                autoComplete="current-password"
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
              <a href="/confirm-email"> Lub przejdz weryfikacji emila</a>
            </div>
          </div>
          {/* {error && <div className="notification is-danger">{error}</div>}
          {userData && (
            <div className="notification is-success">
              Zalogowano pomyślnie jako {userData.name} {userData.surname}.
            </div>
          )} */}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
