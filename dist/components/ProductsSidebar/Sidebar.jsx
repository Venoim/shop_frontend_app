"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Select_1 = __importDefault(require("./Select"));
require("bulma/css/bulma.min.css");
require("./SidebarStyle.scss");
var Sidebar = function (_a) {
    var categories = _a.categories, onSelectCategory = _a.onSelectCategory, onSelectLimit = _a.onSelectLimit;
    var _b = (0, react_1.useState)(null), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    (0, react_1.useEffect)(function () {
        if (categories.length > 0) {
            setIsLoading(false);
        }
    }, [categories]);
    var handleCategoryClick = function (categoryId) {
        setSelectedCategory(categoryId);
        onSelectCategory(categoryId);
    };
    return (<div className="sidebar">
      <h2 className="title is-4 has-text-primary">Wybierz Kategorię</h2>
      <hr className="sidebar-divider"/>
      <ul className="menu-list">
        <li key={0} className={selectedCategory === null ? "selected" : ""} onClick={function () { return handleCategoryClick(null); }} // Obsługa kliknięcia na "Wszystkie produkty", ustawienie wartości null
    ></li>
        {categories.map(function (category) { return (<li key={category.id} className={selectedCategory === category.id ? "selected" : ""} onClick={function () { return handleCategoryClick(category.id); }}>
            <a className={selectedCategory === category.id ? "selected-link" : ""}>
              {category.name}
            </a>
          </li>); })}
      </ul>
      <h2 className="title is-4 has-text-primary">Wybierz Liczbę Produktów</h2>
      <Select_1.default options={["10", "50", "100"]} onSelect={function (limit) {
            onSelectLimit(limit);
        }}/>
    </div>);
};
exports.default = Sidebar;
