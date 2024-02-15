import React, { useState } from "react";

const DataPage = ({ currentUserData, onSave }) => {
  const user = currentUserData.userData;
  console.log(user);
  const [userData, setUserData] = useState({
    name: currentUserData.userData.name,
    surname: currentUserData.userData.surname,
    email: currentUserData.userData.email,
    address: currentUserData.userData.address,
    phoneNumber: currentUserData.userData.phoneNumber,
  });

  // Funkcja do obsługi zmiany danych użytkownika
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(userData);
  };

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
              name="lastName"
              value={userData.surname}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">email:</label>
          <input
            className="input"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
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
