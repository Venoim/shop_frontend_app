import React from "react";

const UserPage = ({ userData, onLogout }) => {
  if (!userData) {
    return <div>Nie jesteś zalogowany</div>;
  }

  const { name, surname, email, id } = userData.user[0];

  return (
    <div className="container">
      <p>ID:{id}</p>
      <h1>
        Witaj, {name} {surname}!
      </h1>
      <p>Twój adres email: {email}</p>
    </div>
  );
};

export default UserPage;
