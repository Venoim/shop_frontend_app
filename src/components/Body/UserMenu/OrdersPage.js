import React from "react";
import axios from "axios";

const OrdersPage = () => {
  // Tutaj pobierz listę zamówień użytkownika, np. z serwera

  // Funkcja do pobierania danych zamówienia
  const fetchOrderData = async (orderId) => {
    try {
      // Wywołaj odpowiedni endpoint na serwerze, aby pobrać dane zamówienia
      const response = await axios.get(
        `http://localhost:3001/api/orders/${orderId}`
      );

      // Zwróć dane zamówienia
      return response.data;
    } catch (error) {
      // Obsłuż błędy
      console.error("Error fetching order data:", error);
      return null; // Zwróć null w przypadku błędu
    }
  };

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
