import React, { useState, useEffect } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import Sidebar from "../../components/ProductsSidebar/Sidebar";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import "./DashboardStyle.scss";
import { DNA } from "react-loader-spinner";

interface Product {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
}

interface Category {
  id: number | null;
  name: string;
}

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedLimit, setSelectedLimit] = useState<string>("10");
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, selectedLimit, currentPage]);

  const fetchCategories = () => {
    fetch("http://localhost:3001/api/categories")
      .then((response) => response.json())
      .then((data) => {
        const allProductsCategory: Category = {
          id: null,
          name: "Wszystkie produkty",
        };
        setCategories([allProductsCategory, ...data]);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const fetchProducts = () => {
    let url = `http://localhost:3001/api/products`;

    if (selectedCategory !== null) {
      url += `/category/${selectedCategory}`;
    }

    if (selectedLimit) {
      url += `?limit=${selectedLimit}&page=${currentPage}`;
    }

    setIsLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
        setProductsCount(data.totalProducts);
      })
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setIsLoading(false));
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleLimitSelect = (limit: string) => {
    setSelectedLimit(limit);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <CommonLayout header={null} footer={null}>
      <div className="columns">
        <div className="column is-one-quarter">
          <Sidebar
            categories={categories}
            onSelectCategory={handleCategorySelect}
            onSelectLimit={handleLimitSelect}
          />
        </div>
        <div className="column dashboard">
          <h2 className="title is-2">Lista Produktów</h2>
          {isLoading ? (
            <div className="loader-container">
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
            <div className="columns products is-multiline">
              {products.map((product) => (
                <div key={product.id} className="column is-one-third">
                  <div
                    className="box"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleProductClick(product.id)}
                  >
                    <article className="media">
                      <div className="media-content">
                        <figure className="image is-4by3">
                          <img src={product.imgUrl} alt={product.name} />
                        </figure>
                        <div className="content">
                          <p className="title is-4">{product.name}</p>
                          <p className="subtitle is-6 has-text-weight-bold">
                            Cena: {product.price} zł
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(productsCount / parseInt(selectedLimit))}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </CommonLayout>
  );
};

export default Dashboard;
