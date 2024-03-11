import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserData } from "../../../types";

interface OrderItem {
  order_id: string;
  order_date: string;
  product_id: string;
  product_name: string;
  quantity: number;
  total_price: number;
}

interface OrdersPageProps {
  userData: UserData;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ userData }) => {
  const userId = userData.userData.id;
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ orders: OrderItem[] }>(
          `http://localhost:3001/api/orders/${userId}`
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  // Funkcja do grupowania zamówień według order_id
  const groupOrdersByOrderId = (
    orders: OrderItem[]
  ): Record<string, OrderItem[]> => {
    const groupedOrders: Record<string, OrderItem[]> = {};
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
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("pl-PL", options);
  };

  // Przekonwertuj obiekt groupedOrders na tablicę i posortuj wg daty zamówienia (od najnowszych do najstarszych)
  const sortedGroupedOrders = Object.entries(groupedOrders).sort((a, b) => {
    const dateA = new Date(a[1][0].order_date);
    const dateB = new Date(b[1][0].order_date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="box">
      <h2 className="title is-4">Your orders</h2>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Order number</th>
            <th>date of order</th>
            <th>Products</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {sortedGroupedOrders.map(([orderId, orderItems]) => (
            <tr key={orderId}>
              <td>{orderId}</td>
              <td>{formatDate(orderItems[0].order_date)}</td>
              <td>
                <ul>
                  {orderItems.map((item) => (
                    <li key={item.product_id}>
                      {item.product_name} - {item.quantity} pcs.
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
