import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Pobieranie parametru productId z adresu URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Pobieram dane");
        const response = await fetch("http://localhost:3001/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych");
        }

        const data = await response.json();
        setProducts(data.data);
        setError(null);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error.message);
        setError("Błąd podczas pobierania danych");
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Ograniczenie ilości wyświetlanych produktów
  const limitedProducts = products.slice(0, 10);

  // Grupowanie produktów według kategorii
  const groupedProducts = {};
  limitedProducts.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    groupedProducts[product.category].push(product);
  });

  return (
    <div>
      <h1 className="title is-1">Strona główna</h1>
      {Object.keys(groupedProducts).map((category, index) => (
        <div key={index}>
          <h2 className="subtitle">{category}</h2>
          <div className="tile is-ancestor">
            {groupedProducts[category].map((product) => (
              <div
                key={product.id}
                className="tile is-parent"
                onClick={() => handleProductClick(product.id)} // Przekazanie ID produktu do funkcji obsługującej kliknięcie
                style={{ cursor: "pointer" }}
              >
                <div className="tile is-child box">
                  <article>
                    <p className="title is-4">{product.name}</p>
                    <p className="subtitle is-6">{product.description}</p>
                    <p className="has-text-weight-bold">
                      Cena: {product.price} zł
                    </p>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
