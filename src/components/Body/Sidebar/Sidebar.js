import React, { useState, useEffect } from "react";
import Select from "./Select";
import { DNA } from "react-loader-spinner";
import "bulma/css/bulma.min.css";
import "./SidebarStyle.scss"; // Zaimportuj plik ze stylami

const Sidebar = ({ categories, onSelectCategory, onSelectLimit }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Dodajemy nowy stan isLoading

  useEffect(() => {
    // Ustawiamy isLoading na false, gdy kategorie zostaną załadowane
    if (categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="sidebar">
      <h2 className="title is-4 has-text-primary">Wybierz Kategorię</h2>
      <hr className="sidebar-divider" />
      {/* <div
        className="loader-container"
        style={{ display: isLoading ? "flex" : "none" }}
      >
        {" "}
        {/* Używamy flex, aby umieścić loader na środku */}
      {/* <DNA
          visible={true}
          height={40}
          width={40}
          ariaLabel="Loading"
          type="ThreeDots"
          color="#007bff"
        />
      </div> */}{" "}
      {/* // {!isLoading && ( */}
      <ul className="menu-list">
        {categories.map((category) => (
          <li
            key={category.id}
            className={selectedCategory === category.id ? "selected" : ""}
            onClick={() => handleCategoryClick(category.id)}
          >
            <a
              className={
                selectedCategory === category.id ? "selected-link" : ""
              }
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
      {/* )} */}
      <h2 className="title is-4 has-text-primary">Wybierz Liczbę Produktów</h2>
      <Select
        options={["10", "50", "100"]}
        onSelect={(limit) => {
          onSelectLimit(limit);
        }}
      />
    </div>
  );
};

export default Sidebar;
