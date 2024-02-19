import React, { useState, useEffect } from "react";

const DataPage = ({ currentUserData, onSave }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  console.log(userData.userData.id);
  // Funkcja do obsługi zmiany danych użytkownika
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${userData.userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (response.ok) {
        console.log("Dane użytkownika zostały zaktualizowane.");
        // Aktualizacja danych w localStorage
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        console.error("Wystąpił błąd podczas aktualizacji danych użytkownika.");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania żądania:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className="box">
      <h2 className="title is-4">Twoje dane</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Imię:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Nazwisko:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="surname"
              value={userData.surname}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Adres:</label>
          <input
            className="input"
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="field">
          <label className="label">Numer telefonu:</label>
          <input
            className="input"
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <button className="button is-primary" type="submit">
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
};

export default DataPage;
