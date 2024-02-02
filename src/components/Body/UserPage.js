import React from "react";

const UserPage = ({ userData }) => {
  return (
    <div className="container">
      <h1>
        Witaj, {userData.name} {userData.surname}!
      </h1>
      <p>Twój adres email: {userData.email}</p>
      {/* Dodaj inne informacje, które chciałbyś wyświetlić o użytkowniku */}
    </div>
  );
};

export default UserPage;
