import React, { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdukts = async () => {
      try {
        console.log("Pobieram dane");
        const response = await fetch("http://localhost:3001/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych");
        }

        const produkts = await response.json();
        setData(produkts);
        setError(null);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error.message);
        setError("Błąd podczas pobierania danych");
      }
    };

    fetchProdukts();
  }, []);

  return (
    <div>
      <h1 className="title is-1">Strona główna</h1>
      <div className="tile is-ancestor">
        {data.map((product) => (
          <div key={product.id} className="tile is-parent">
            <article className="tile is-child box">
              <p className="title is-4">{product.name}</p>
              <p className="subtitle is-6">{product.description}</p>
              <p className="has-text-weight-bold">Cena: {product.price} zł</p>
              {/* Dodaj dodatkowe informacje lub komponenty według potrzeb */}
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
