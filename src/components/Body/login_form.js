import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import "./login_form.css";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

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
        // Dodaj logikę obsługi sukcesu
        console.log("Zalogowano pomyślnie");
      } else {
        // Dodaj logikę obsługi błędów
        console.error("Błąd podczas logowania");
      }
    } catch (error) {
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
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
