import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonLayout from "../../components/layout/CommonLayout.js";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import "./BasketStyle.scss";

const Basket = ({ userData }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const userId = userData?.userData?.id;

  useEffect(() => {
    const fetchBasketItems = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `http://localhost:3001/api/basket/${userId}`
        );
        setBasketItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching basket items:", error);
        toast.error("Error fetching basket items:", error);
      }
    };

    fetchBasketItems();
  }, [userId]);

  useEffect(() => {
    const storedBasketItems = localStorage.getItem("basketItems");
    if (storedBasketItems !== null) {
      setBasketItems(JSON.parse(storedBasketItems));
    }
  }, []);

  const updateBasketInLocalStorage = (updatedBasketItems) => {
    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
  };

  const sendUpdatedBasketItemToServer = _.debounce(
    async (itemId, updatedQuantity) => {
      try {
        await axios.put(`http://localhost:3001/api/basket/update/${itemId}`, {
          quantity: updatedQuantity,
        });
      } catch (error) {
        console.error("Error updating basket item on the server:", error);
        toast.error("Error updating basket item on the server:", error);
      }
    },
    500
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedBasketItems = basketItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setBasketItems(updatedBasketItems);
    updateBasketInLocalStorage(updatedBasketItems);

    // Asynchroniczne wysyłanie danych na serwer
    sendUpdatedBasketItemToServer(itemId, newQuantity);
  };

  const sendRemoveItemRequestToServer = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/api/basket/remove/${itemId}`);
    } catch (error) {
      console.error("Error removing item on the server:", error);
      toast.error("Error removing item on the server:", error);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedBasketItems = basketItems.filter((item) => item.id !== itemId);
    setBasketItems(updatedBasketItems);
    updateBasketInLocalStorage(updatedBasketItems);

    // Asynchroniczne wysyłanie danych na serwer
    sendRemoveItemRequestToServer(itemId);
  };

  const totalCost = basketItems.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  const handleCheckout = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/orders/checkout`,
        { user_id: userId }
      );

      toast.success("Zamówienie zostało złożone pomyślnie!");
      navigate(`/user/orders`);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(
        "Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie później."
      );
    }
  };

  const handleIncrementQuantity = (itemId) => {
    handleQuantityChange(
      itemId,
      basketItems.find((item) => item.id === itemId).quantity + 1
    );
  };

  const handleDecrementQuantity = (itemId) => {
    const currentQuantity = basketItems.find(
      (item) => item.id === itemId
    ).quantity;
    if (currentQuantity > 1) {
      handleQuantityChange(itemId, currentQuantity - 1);
    }
  };

  return (
    <CommonLayout header={null} footer={null}>
      <div className="section">
        <ToastContainer position="bottom-right" />
        <div className="container">
          <h2 className="title is-2">Twój koszyk</h2>
          {isLoading ? (
            <div className="loader-container">
              <DNA
                visible={true}
                height={80}
                width={80}
                ariaLabel="Loading"
                type="ThreeDots"
                color="#007bff"
              />
            </div>
          ) : basketItems.length === 0 ? (
            <p>Koszyk jest pusty.</p>
          ) : (
            <div className="box">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nazwa produktu</th>
                    <th>Cena</th>
                    <th className="how">Ilość</th>
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
                          onClick={() => handleDecrementQuantity(item.id)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="input is-small quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          min="1"
                        />
                        <button
                          className="button is-small"
                          onClick={() => handleIncrementQuantity(item.id)}
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
                    <td></td>
                    <td>
                      <button
                        className="button is-success"
                        onClick={() => handleCheckout(userId)}
                      >
                        Kup
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
};

export default Basket;
