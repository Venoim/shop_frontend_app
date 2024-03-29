import React, { useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const EmailVerificationForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const RESPONSE = await axios.post(
        "http://localhost:3001/api/users/confirm-email",
        { email, confirmationCode }
      );
      console.log(RESPONSE.data); // Logging the response from the server after email confirmation
      toast.success("Email address confirmed successfully");
      navigate(`/login`);
    } catch (error) {
      toast.error("Error confirming email address");
    }
  };

  return (
    <CommonLayout header={null} footer={null}>
      <div className="container box" style={{ marginTop: "3rem" }}>
        <ToastContainer position="bottom-right" />
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">E-mail adress</label>
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
            <label className="label">Verification code</label>
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
                confirm email address
              </button>
            </div>
          </div>
        </form>
      </div>
    </CommonLayout>
  );
};

export default EmailVerificationForm;
