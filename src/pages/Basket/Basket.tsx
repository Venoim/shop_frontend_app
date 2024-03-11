import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonLayout from "../../components/layout/CommonLayout";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { DNA } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import "./BasketStyle.scss";
import { BasketItem, BasketProps } from "../../types";

const Basket: React.FC<BasketProps> = ({ userData }) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const userId: number | undefined = userData?.id;
  console.log(userId);
  useEffect(() => {
    const fetchBasketItems = async () => {
      if (!userId) return;
      try {
        const response = await axios.get<BasketItem[]>(
          `http://localhost:3001/api/basket/${userId}`
        );
        setBasketItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching basket items:", error);
        toast.error("Error fetching basket items:" + error);
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

  const updateBasketInLocalStorage = (updatedBasketItems: BasketItem[]) => {
    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
  };

  const sendUpdatedBasketItemToServer = _.debounce(
    async (userId: number, itemId: number, updatedQuantity: number) => {
      console.log("passed values", userId, itemId);
      try {
        await axios.put(`http://localhost:3001/api/basket/update/`, {
          userId: userId,
          productId: itemId,
          quantity: updatedQuantity,
        });
      } catch (error) {
        console.error("Error updating basket item on the server:", error);
        toast.error("Error updating basket item on the server:" + error);
      }
    },
    500
  );

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const updatedBasketItems = basketItems.map((item) => {
      if (item.id === itemId) {
        // We check the product ID
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setBasketItems(updatedBasketItems);
    updateBasketInLocalStorage(updatedBasketItems);

    // Asynchronously sending data to the server
    sendUpdatedBasketItemToServer(userId, itemId, newQuantity);
  };

  const sendRemoveItemRequestToServer = async (
    userId: number,
    itemId: number
  ) => {
    try {
      console.log(itemId);
      await axios.delete(
        `http://localhost:3001/api/basket/remove/${userId}/${itemId}`
      );
    } catch (error) {
      console.error("Error removing item on the server:", error);
      toast.error("Error removing item on the server:" + error);
    }
  };

  const handleRemoveItem = (itemId: number) => {
    toast.info("The product has been removed from the cart.");
    const updatedBasketItems = basketItems.filter((item) => item.id !== itemId);
    setBasketItems(updatedBasketItems);
    updateBasketInLocalStorage(updatedBasketItems);

    // Asynchronously send data to the server if userId is defined
    if (userId !== undefined) {
      sendRemoveItemRequestToServer(userId, itemId);
    } else {
      toast.error("User ID is undefined");
    }
  };

  const totalCost = basketItems.reduce((total, item) => {
    return total + parseFloat(item.price.toString()) * item.quantity;
  }, 0);

  const handleCheckout = async (userId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/orders/checkout`,
        { user_id: userId }
      );

      toast.success("The order has been placed successfully!");
      navigate(`/user/orders`);
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error(
        "An error occurred while placing your order. Please try again later."
      );
    }
  };

  const handleIncrementQuantity = (itemId: number) => {
    handleQuantityChange(
      itemId,
      basketItems.find((item) => item.id === itemId)!.quantity + 1
    );
  };

  const handleDecrementQuantity = (itemId: number) => {
    const currentQuantity = basketItems.find(
      (item) => item.id === itemId
    )!.quantity;
    if (currentQuantity > 1) {
      handleQuantityChange(itemId, currentQuantity - 1);
    }
  };

  return (
    <CommonLayout header={null} footer={null}>
      <div className="section">
        <ToastContainer position="bottom-right" />
        <div className="container">
          <h2 className="title is-2">Your basket</h2>
          {isLoading ? (
            <div className="loader-container">
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : basketItems.length === 0 ? (
            <p>Basket is empty.</p>
          ) : (
            <div className="box">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product name</th>
                    <th>Price</th>
                    <th className="how">Quantity</th>
                    <th>Shares</th>
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
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="total-cost">
                  <tr>
                    <td>Sum:</td>
                    <td> {totalCost.toFixed(2)} $</td>
                    <td></td>
                    <td>
                      <button
                        className="button is-success"
                        onClick={() => handleCheckout(userId ?? 0)}
                      >
                        Buy
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
