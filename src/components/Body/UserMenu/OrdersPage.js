import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Dodaj import

const OrdersPage = ({ currentUserData }) => {
  const userId = currentUserData.userData.id;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Pobierz listę zamówień użytkownika z serwera po user_id
        const response = await axios.get(
          `http://localhost:3001/api/orders/${userId}`
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]); // Dodaj userId jako zależność

  // Funkcja do grupowania zamówień według order_id
  const groupOrdersByOrderId = (orders) => {
    const groupedOrders = {};
    orders.forEach((order) => {
      if (!groupedOrders[order.order_id]) {
        groupedOrders[order.order_id] = [];
      }
      groupedOrders[order.order_id].push(order);
    });
    return groupedOrders;
  };

  // Zgrupuj zamówienia według order_id
  const groupedOrders = groupOrdersByOrderId(orders);

  // Funkcja do przekształcenia daty zamówienia
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("pl-PL", options);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Twoje zamówienia</h2>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Numer zamówienia</th>
            <th>Data zamówienia</th>
            <th>Produkty</th>
            <th>Suma</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedOrders).map(([orderId, orderItems]) => (
            <tr>
              <td>{orderId}</td>
              <td>{formatDate(orderItems[0].order_date)}</td>
              <td>
                <ul>
                  {orderItems.map((item) => (
                    <li key={item.product_id}>
                      {item.product_name} - {item.quantity} szt.
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                {orderItems.reduce(
                  (total, item) => total + item.total_price,
                  0
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
