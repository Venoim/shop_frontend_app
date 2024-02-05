import React from "react";
import Select from "./Select";
import "bulma/css/bulma.min.css";
import "./SidebarStyle.scss";

const Sidebar = ({ categories, onSelectCategory, onSelectLimit }) => {
  return (
    <div className="sidebar">
      <h2 className="title is-4 has-text-primary">Wybierz Kategorię</h2>
      <hr className="sidebar-divider" />

      <ul className="menu-list">
        <li onClick={() => onSelectCategory(null)}>
          {/* <a className="has-text-weight-semibold">Wszystkie produkty</a> */}
        </li>
        {categories &&
          categories.map((category) => (
            <li key={category.id} onClick={() => onSelectCategory(category.id)}>
              <a>{category.name}</a>
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
