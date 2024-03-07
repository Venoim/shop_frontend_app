import React, { useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import "bulma/css/bulma.min.css";
import "./login_form.css";
import UserPage from "../User/UserPage";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserData, LoginFormProps } from "../../types";
import "react-toastify/dist/ReactToastify.css";

interface LoginData {
  email: string;
  password: string;
}

interface UserPageProps {
  userData?: UserData;
  onLogout?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate(`/`);
        onLogin(userData);
        setError(null);
        console.log("Zalogowano pomyślnie", userData);
      } else {
        setError("Błędne dane logowania. Spróbuj ponownie.");
        setUserData(null);
        console.error("Błąd podczas logowania");
        toast.error("Błędne dane logowania. Spróbuj ponownie.");
      }
    } catch (error) {
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
    onLogin(userData);
  };
  const handleLogout = () => {
    // Implementacja funkcji handleLogout
  };

  return (
    <CommonLayout header={null} footer={null}>
      <div className="container">
        <ToastContainer position="bottom-right" />
        {userData ? (
          <UserPage userData={userData} onLogout={handleLogout} />
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
          </form>
        )}
      </div>
    </CommonLayout>
  );
};

export default LoginForm;
