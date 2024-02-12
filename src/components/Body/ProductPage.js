import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductPage = ({ userData }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Pobieranie parametru id z adresu URL
  // console.log("dane uzytkownika:", userData[0].id);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Pobieram dane produktu");
        const response = await fetch(
          `http://localhost:3001/api/products/${id}`, // Użyj parametru id z adresu URL
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych produktu");
          toast.error("Błąd podczas pobierania danych produktu");
        }

        const data = await response.json();
        // Pobierz pierwszy element z tablicy result, jeśli istnieje
        if (data.result && data.result.length > 0) {
          setProduct(data.result[0]);
          setError(null);
        } else {
          throw new Error("Brak danych produktu");
          toast.error("Brak danych produktu");
        }
      } catch (error) {
        console.error(
          "Błąd podczas pobierania danych produktu:",
          error.message
        );
        setError("Błąd podczas pobierania danych produktu");
        toast.error("Błąd podczas pobierania danych produktu:", error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:3001/api/basket/add", {
        userId: userData.user[0].id, // ID aktualnego użytkownika
        productId: product.id, // ID produktu
        quantity: 1, //  ilość produktu
      });
      // alert("Produkt dodany do koszyka!");
      toast.success("Produkt dodany do koszyka!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Wystąpił błąd podczas dodawania produktu do koszyka.");
      toast.error("Wystąpił błąd podczas dodawania produktu do koszyka.");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <ToastContainer />
      <div className="columns">
        <div className="column is-half">
          <p>ID: {product.id}</p>
          <h1 className="title">{product.name}</h1>
          <p>Opis: {product.description}</p>
          <p>Cena: {product.price} zł</p>
          <button className="button is-primary" onClick={handleAddToCart}>
            Dodaj do koszyka
          </button>
        </div>
        {/* Wyświetl obrazek tylko jeśli jest dostępny */}
        {product.imgUrl && (
          <div className="column is-half">
            <figure className="image is-4by3">
              <img src={product.imgUrl} alt={product.name} />
            </figure>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
