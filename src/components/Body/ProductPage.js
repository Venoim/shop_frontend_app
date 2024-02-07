import React, { useState, useEffect } from "react";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Pobieram dane produktu");
        const response = await fetch(
          `http://localhost:3001/api/products/${product}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych produktu");
        }

        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (error) {
        console.error(
          "Błąd podczas pobierania danych produktu:",
          error.message
        );
        setError("Błąd podczas pobierania danych produktu");
      }
    };

    fetchProduct();
  }, [product]);

  const handleAddToCart = () => {
    // Logika dodawania do koszyka
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className="columns">
        <div className="column is-half">
          <h1 className="title">{product.name}</h1>
          <p>ID: {product.id}</p>
          <p>{product.description}</p>
          <p>Cena: {product.price} zł</p>
          <button className="button is-primary" onClick={handleAddToCart}>
            Dodaj do koszyka
          </button>
        </div>
        <div className="column is-half">
          <figure className="image is-4by3">
            <img src={product.image} alt={product.name} />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
