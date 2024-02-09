import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BasketStyle.scss";

const Basket = ({ userData }) => {
  const [basketItems, setBasketItems] = useState([]);

  const userId = userData?.[0]?.id;

  useEffect(() => {
    // Pobierz zawartość koszyka dla danego użytkownika po załadowaniu komponentu
    const fetchBasketItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/basket/${userId}`
        );
        setBasketItems(response.data);
      } catch (error) {
        console.error("Error fetching basket items:", error);
      }
    };

    fetchBasketItems();
  }, [userId]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await axios.put(`http://localhost:3001/api/basket/update/${itemId}`, {
        quantity: newQuantity,
      });
      // Zaktualizuj stan koszyka po zmianie ilości
      const updatedBasketItems = basketItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setBasketItems(updatedBasketItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/api/basket/remove/${itemId}`);
      // Usuń produkt z koszyka na podstawie jego ID
      const updatedBasketItems = basketItems.filter(
        (item) => item.cart_id !== itemId
      );
      setBasketItems(updatedBasketItems);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const totalCost = basketItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="section">
      <div className="container">
        <h2 className="title">Twój koszyk</h2>
        {basketItems.length === 0 ? (
          <p>Koszyk jest pusty.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nazwa produktu</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {basketItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td className="quantity">
                    <button
                      className="button is-small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="input is-small quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      min="1"
                    />
                    <button
                      className="button is-small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      className="button is-danger is-small"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="total-cost">
              <tr>
                <td>Suma:</td>
                <td> {totalCost.toFixed(2)} zł</td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default Basket;
