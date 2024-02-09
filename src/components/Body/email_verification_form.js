import React, { useState } from "react";
import axios from "axios";

const EmailVerificationForm = () => {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/confirm-email",
        { email, confirmationCode }
      );
      console.log(response.data); // Zalogowanie odpowiedzi z serwera po potwierdzeniu e-maila
      // Tutaj możesz przekierować użytkownika na inną stronę lub wyświetlić komunikat o sukcesie
    } catch (error) {
      console.error("Błąd podczas potwierdzania adresu e-mail:", error);
      setErrorMessage("Błąd podczas potwierdzania adresu e-mail");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Adres e-mail</label>
          <div className="control">
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Kod weryfikacyjny</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          </div>
        </div>
        {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">
              Potwierdź adres e-mail
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailVerificationForm;
