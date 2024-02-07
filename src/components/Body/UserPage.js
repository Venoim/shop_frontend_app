import React from "react";

const UserPage = ({ userData, onLogout }) => {
  if (!userData) {
    return <div>Nie jesteś zalogowany</div>;
  }

  const { name, surname, email } = userData;

  return (
    <div className="container">
      <h1>
        Witaj, {name} {surname}!
      </h1>
      <p>Twój adres email: {email}</p>
      <button onClick={onLogout}>Wyloguj</button>
    </div>
  );
};

export default UserPage;
