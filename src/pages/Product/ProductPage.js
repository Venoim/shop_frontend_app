import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/layout/CommonLayout.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductPageStyle.scss";
import { DNA } from "react-loader-spinner";
import _ from "lodash";

const ProductPage = ({ userData }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Pobieram dane produktu");
        const response = await fetch(
          `http://localhost:3001/api/products/${id}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych produktu");
        }

        const data = await response.json();
        if (data.result && data.result.length > 0) {
          setProduct(data.result[0]);
          setError(null);
        } else {
          throw new Error("Brak danych produktu");
        }
      } catch (error) {
        console.error(
          "Błąd podczas pobierania danych produktu:",
          error.message
        );
        setError("Błąd podczas pobierania danych produktu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = _.debounce(async () => {
    try {
      if (!userData.userData) {
        toast.error("Musisz być zalogowany, aby dodać produkt do koszyka.");
        return;
      }

      toast.success("Produkt dodany do koszyka!");
      await axios.post("http://localhost:3001/api/basket/add", {
        userId: userData.userData.id,
        productId: product.id,
        quantity: 1,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Wystąpił błąd podczas dodawania produktu do koszyka.");
    }
  }, 200);

  return (
    <CommonLayout header={null} footer={null}>
      <div className="container ">
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
        ) : (
          <div className="columns productPage">
            <ToastContainer position="bottom-right" />
            <div className="column is-half">
              <p>ID: {product && product.id}</p>
              <h1 className="title">{product && product.name}</h1>
              <div className="box">
                <p>Opis: {product && product.description}</p>
              </div>
              <div>
                <p className="price">Cena: {product && product.price} zł</p>
                <button
                  className="basket button is-primary"
                  onClick={handleAddToCart}
                >
                  Dodaj do koszyka
                </button>
              </div>
            </div>
            {product && product.imgUrl && (
              <div className="column is-half">
                <figure className="image is-4by3">
                  <img src={product.imgUrl} alt={product.name} />
                </figure>
              </div>
            )}
          </div>
        )}
      </div>
    </CommonLayout>
  );
};

export default ProductPage;
