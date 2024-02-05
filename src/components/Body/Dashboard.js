import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar.js";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLimit, setSelectedLimit] = useState("10");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, selectedLimit]);

  const fetchCategories = () => {
    if (categories.length === 0) {
      // pobieranie kategorii tylko jeśli jeszcze nie zostały pobrane
      fetch("http://localhost:3001/api/categories")
        .then((response) => response.json())
        .then((data) => {
          const allProductsCategory = { id: null, name: "Wszystkie produkty" };
          setCategories([allProductsCategory, ...data]);
        })
        .catch((error) => console.error("Error fetching categories:", error));
    }
  };

  const fetchProducts = () => {
    let url = "http://localhost:3001/api/products";

    if (selectedCategory) {
      url += `/category/${selectedCategory}`;
    }

    if (selectedLimit) {
      url += `?limit=${selectedLimit}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleLimitSelect = (limit) => {
    setSelectedLimit(limit);
  };

  return (
    <div className="dashboard">
      <div className="columns">
        <div className="column is-one-quarter">
          <Sidebar
            categories={categories}
            onSelectCategory={handleCategorySelect}
            onSelectLimit={handleLimitSelect}
          />
        </div>
        <div className="column">
          <h2 className="title is-2">Lista Produktów</h2>
          <div className="columns is-multiline">
            {products.map((product) => (
              <div key={product.id} className="column is-one-third">
                <div className="box">
                  <article className="media">
                    <div className="media-content">
                      <div className="content">
                        <p className="title is-4">{product.name}</p>
                        <p className="subtitle is-6">{product.description}</p>
                        <p className="has-text-weight-bold">
                          Cena: {product.price} zł
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
