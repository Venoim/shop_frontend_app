import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import { useNavigate } from "react-router-dom";
import "./HomeStyle.scss";
import { DNA } from "react-loader-spinner";

// Interfejs dla pojedynczego produktu
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  category: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
        setError(null); // Wyzeruj błąd w przypadku udanego pobrania danych
      } catch (error) {
        // console.error("Błąd podczas pobierania danych:", error.message);
        setError("Błąd podczas pobierania danych"); // Ustaw błąd jako string
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const limitedProducts = products.slice(0, 10);

  const groupedProducts: { [key: string]: Product[] } = {};
  limitedProducts.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    groupedProducts[product.category].push(product);
  });

  return (
    <CommonLayout header={null} footer={null}>
      <div className="home-container">
        <h1 className="title is-1 has-text-centered">Strona główna</h1>
        {isLoading ? (
          <div className="has-text-centered">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          Object.keys(groupedProducts).map((category, index) => (
            <div key={index}>
              <div className="product-container">
                {groupedProducts[category].map((product) => (
                  <div
                    key={product.id}
                    className="product-box"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-details">
                      <p className="product-title">{product.name}</p>
                      <p className="product-description">
                        {product.description}
                      </p>
                      <p className="product-price">Cena: {product.price} zł</p>
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
