import React, { useState, useEffect } from "react";

const DataPage = ({ currentUserData, onSave }) => {
  const user = currentUserData.userData;
  console.log(user);
  const [userData, setUserData] = useState({
    name: user.name || "", // Jeśli user.name jest null lub undefined, ustaw pusty ciąg znaków
    surname: user.surname || "",
    email: user.email || "",
    address: user.address || "",
    phoneNumber: user.phoneNumber || "",
  });

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
        `http://localhost:3001/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      // Obsługa odpowiedzi serwera, np. wyświetlenie komunikatu o sukcesie lub błędzie
      if (response.ok) {
        console.log("Dane użytkownika zostały zaktualizowane.");
      } else {
        console.error("Wystąpił błąd podczas aktualizacji danych użytkownika.");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania żądania:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Zapobiegamy domyślnej akcji przesyłania formularza
    handleSave(); // Wywołujemy funkcję handleSave
  };

  return (
    <div className="box">
      <h2 className="title is-4">Twoje dane</h2>
      {/* Formularz edycji danych */}
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
