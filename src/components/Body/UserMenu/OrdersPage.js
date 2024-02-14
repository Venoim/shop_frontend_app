// OrdersPage.js
import React from "react";

const OrdersPage = () => {
  // Tutaj pobierz listę zamówień użytkownika, np. z serwera

  return (
    <div className="box">
      <h2 className="title is-4">Twoje zamówienia</h2>
      {/* Wyświetl listę zamówień */}
      <ul>
        <li>Zamówienie 1 - Szczegóły zamówienia</li>
        <li>Zamówienie 2 - Szczegóły zamówienia</li>
        {/* Tutaj renderuj rzeczywistą listę zamówień */}
      </ul>
    </div>
  );
};

export default OrdersPage;
