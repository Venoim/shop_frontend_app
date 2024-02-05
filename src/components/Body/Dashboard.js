import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar.js";
import Pagination from "./Pagination.js";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLimit, setSelectedLimit] = useState("10");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, selectedLimit, categories]);

  const fetchCategories = () => {
    if (categories.length === 0) {
      fetch("http://localhost:3001/api/categories")
        .then((response) => response.json())
        .then((data) => {
          const allProductsCategory = { id: null, name: "Wszystkie produkty" };
          setCategories([allProductsCategory, ...data]);
        })
        .catch((error) => console.error("Error fetching categories:", error));
    }
  };

  const fetchProducts = (page = 1) => {
    let url = "http://localhost:3001/api/products";

    if (selectedCategory) {
      url += `/category/${selectedCategory}`;
    }

    if (selectedLimit) {
      url += `?limit=${selectedLimit}&page=${page}`;
    } else {
      url += `?page=${page}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setProductsCount(data.count);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleLimitSelect = (limit) => {
    setSelectedLimit(limit);
    setCurrentPage(1); // Przy zmianie limitu ustaw currentPage na 1
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            {products &&
              products.map((product) => (
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
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(productsCount / selectedLimit)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
