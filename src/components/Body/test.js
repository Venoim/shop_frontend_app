import React, { useState, useEffect } from "react";

const UserList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("pobieram dane");
        const response = await fetch("http://localhost:3001/api/users", {
          mode: "cors",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych");
        }
        const userList = await response.json();
        setData(userList);
        setError(null);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error.message);
        setError("Błąd podczas pobierania danych");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>Lista Użytkowników</h2>
      {error && <div className="notification is-danger">{error}</div>}
      <ul>
        {data.map((user) => (
          <li key={user.id}>{`${user.name} ${user.surname}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
