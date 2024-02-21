import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/layout/CommonLayout.js";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
// import "./HomeStyle.scss"; // Zaimportuj plik ze stylami

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const limitedProducts = products.slice(0, 10);

  const groupedProducts = {};
  limitedProducts.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    groupedProducts[product.category].push(product);
  });

  return (
    <CommonLayout header={null} footer={null}>
      <div className="home-container">
        <h1 className="title is-1">Strona główna</h1>
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
          Object.keys(groupedProducts).map((category, index) => (
            <div key={index}>
              <div className="tile is-ancestor">
                {groupedProducts[category].map((product) => (
                  <div
                    key={product.id}
                    className="tile is-parent"
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="tile is-child box">
                      <article>
                        <figure className="image is-4by3">
                          <img src={product.imgUrl} alt={product.name} />
                        </figure>
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
          ))
        )}
      </div>
    </CommonLayout>
  );
};

export default Home;
