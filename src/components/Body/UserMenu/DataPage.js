import React, { useState } from "react";

const DataPage = ({ userData }) => {
  // Załóżmy, że masz stan dla danych użytkownika
  const [userData, setUserData] = useState({
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan.kowalski@example.com",
    address: "ul. Testowa 123, 00-000 Test",
    phoneNumber: "123-456-789",
  });

  // Funkcja do obsługi zmiany danych użytkownika
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Funkcja do zapisu zmienionych danych na serwerze

  return (
    <div className="box">
      <h2 className="title is-4">Twoje dane</h2>
      {/* Formularz edycji danych */}
      <form>
        <div className="field">
          <label className="label">Imię:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="firstName"
              value={userData.firstName}
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
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <div className="field">
          <label className="label">email:</label>
          <input
            className="input"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div> */}
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
