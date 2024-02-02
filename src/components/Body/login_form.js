import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "./login_form.css";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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
      const response = await fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userData = await response.json();
        // Ustaw dane użytkownika w stanie komponentu
        setUserData(userData);
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

  return (
    <div className="container">
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
          <label className="label">Hasło</label>
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
            <button type="submit" className="button is-primary">
              Zaloguj
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
    </div>
  );
};

export default LoginForm;
