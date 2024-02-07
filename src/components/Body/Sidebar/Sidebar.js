import React, { useState } from "react";
import Select from "./Select";
import "bulma/css/bulma.min.css";
import "./SidebarStyle.scss";

const Sidebar = ({ categories, onSelectCategory, onSelectLimit }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="sidebar">
      <h2 className="title is-4 has-text-primary">Wybierz Kategorię</h2>
      <hr className="sidebar-divider" />

      <ul className="menu-list">
        {categories &&
          categories.map((category) => (
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
