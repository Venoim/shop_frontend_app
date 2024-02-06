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
    console.log("Selected category in useEffect:", selectedCategory);
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, selectedLimit, currentPage]);

  const fetchCategories = () => {
    fetch("http://localhost:3001/api/categories")
      .then((response) => response.json())
      .then((data) => {
        const allProductsCategory = { id: null, name: "Wszystkie produkty" };
        setCategories([allProductsCategory, ...data]);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchProducts = () => {
    let url = `http://localhost:3001/api/products`;
    console.log("kategoria:", selectedCategory);
    // Wybieramy odpowiedni endpoint w zależności od tego, czy wybrano kategorię
    if (selectedCategory) {
      url += `/category/${selectedCategory}`;
    }

    if (selectedLimit) {
      url += `?limit=${selectedLimit}&page=${currentPage}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        setProductsCount(data.totalProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleCategorySelect = (categoryId) => {
    console.log("Selected category:", categoryId);
    setSelectedCategory(categoryId);
  };

  const handleLimitSelect = (limit) => {
    setSelectedLimit(limit);
    setCurrentPage(1);
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
            totalPages={Math.ceil(productsCount / parseInt(selectedLimit))}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
