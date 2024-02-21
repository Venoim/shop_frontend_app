import React, { useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EmailVerificationForm = () => {
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/confirm-email",
        { email, confirmationCode }
      );
      console.log(response.data); // Zalogowanie odpowiedzi z serwera po potwierdzeniu e-maila
      toast.success("Potwierdzanie adresu e-mail zakończone sukcesem");
      navigate(`/login`);
    } catch (error) {
      // console.error("Błąd podczas potwierdzania adresu e-mail:", error);
      // setErrorMessage("Błąd podczas potwierdzania adresu e-mail");
      toast.error("Błąd podczas potwierdzania adresu e-mail");
    }
  };

  return (
    <CommonLayout header={null} footer={null}>
      <div className="container">
        <ToastContainer position="bottom-right" />
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
          {/* {errorMessage && <p className="has-text-danger">{errorMessage}</p>} */}
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Potwierdź adres e-mail
              </button>
            </div>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
};

export default EmailVerificationForm;
