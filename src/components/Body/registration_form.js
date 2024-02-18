import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bulma/css/bulma.min.css";
import "./registration_form.css";

const urlSerwer = "http://localhost:3001/api/users/register";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    // name: "",
    // surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sprawdzenie, czy email istnieje już w bazie
      const emailExistsResponse = await fetch(
        `http://localhost:3001/api/users/check-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      if (emailExistsResponse.ok) {
        const emailExistsResult = await emailExistsResponse.json();

        if (emailExistsResult.exists) {
          console.error("Podany email jest już używany.");
          toast.error("Podany email jest już używany.");
          return; // Przerwij rejestrację, gdy email już istnieje
        }
      } else {
        console.error("Błąd podczas sprawdzania emaila");
        toast.error("Błąd podczas sprawdzania emaila");
        return;
      }

      // Sprawdzenie, czy hasła są takie same
      if (formData.password !== formData.confirmPassword) {
        console.error("Hasła muszą być takie same.");
        toast.error("Hasła muszą być takie same.");
        return; // Przerwij rejestrację, gdy hasła są różne
      }

      // Wysłanie danych do bazy danych
      const registerResponse = await fetch(urlSerwer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (registerResponse.ok) {
        console.log("Użytkownik zarejestrowany pomyślnie");
        setRegistrationSuccess(true); // Ustawienie stanu na sukces po pomyślnej rejestracji
        toast.success("Użytkownik zarejestrowany pomyślnie");
        setFormData({
          // name: "",
          // surname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          console.error(
            "Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny."
          );
          toast.error(
            "Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny."
          );
          return;
        }
      }
    } catch (error) {
      console.error("Błąd połączenia z serwerem:", error);
      toast.error("Błąd połączenia z serwerem:" + error.message);
    }
  };

  const handleCancel = () => {
    // Anulowanie Rejestracji
    console.log("Anulowano rejestrację");
  };

  return (
    <div className="container registerBox">
      <ToastContainer position="bottom-right" />
      {/* {registrationSuccess && ( // Wyświetlanie komunikatu po udanej rejestracji
        <div className="notification is-success">
          Użytkownik został zarejestrowany pomyślnie.
          <a href="/confirm-email"> Przejdz weryfikacji emila</a>
        </div>
      )} */}
      <form className="box" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Confirm Password</label>
          <div className="control">
            <input
              className="input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary">
              Register
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-danger"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {registrationSuccess && ( // Wyświetlanie komunikatu po udanej rejestracji
        <div className="notification is-success">
          Użytkownik został zarejestrowany pomyślnie.
          <br />
          <button className="button is-link" href="/confirm-email">
            Przejdz weryfikacji emila
          </button>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
