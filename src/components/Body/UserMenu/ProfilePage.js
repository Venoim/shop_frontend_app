import React, { useState } from "react";

const ProfilePage = () => {
  // Załóżmy, że masz stan dla danych użytkownika
  const [userData, setUserData] = useState({
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jan.kowalski@example.com",
    address: "ul. Testowa 123, 00-000 Warszawa",
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
    <div>
      <h2>Twoje dane</h2>
      {/* Formularz edycji danych */}
      <form>
        <label>
          Imię:
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nazwisko:
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Adres:
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Numer telefonu:
          <input
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Zapisz zmiany</button>
      </form>
    </div>
  );
};

export default ProfilePage;
