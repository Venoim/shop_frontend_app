import React, { useState, useEffect } from "react";
import Select from "./Select";
import "bulma/css/bulma.min.css";
import "./SidebarStyle.scss";

interface Category {
  id: number | null;
  name: string;
}

interface SidebarProps {
  categories: Category[];
  onSelectCategory: (categoryId: number | null) => void;
  onSelectLimit: (limit: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  onSelectCategory,
  onSelectLimit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="sidebar">
      <h2 className="title is-4 has-text-primary">Select a Category</h2>
      <hr className="sidebar-divider" />
      <ul className="menu-list">
        <li
          key={0}
          className={selectedCategory === null ? "selected" : ""}
          onClick={() => handleCategoryClick(null)} // Handle clicking on "All Products", setting the value to null
        ></li>
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
      <h2 className="title is-4 has-text-primary">Select Number of Products</h2>
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
