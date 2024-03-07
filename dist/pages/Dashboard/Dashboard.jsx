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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var CommonLayout_1 = __importDefault(require("../../components/layout/CommonLayout"));
var Sidebar_1 = __importDefault(require("../../components/ProductsSidebar/Sidebar"));
var Pagination_1 = __importDefault(require("../../components/Pagination/Pagination"));
var react_router_dom_1 = require("react-router-dom");
require("./DashboardStyle.scss");
var react_loader_spinner_1 = require("react-loader-spinner");
var Dashboard = function () {
    var _a = (0, react_1.useState)([]), categories = _a[0], setCategories = _a[1];
    var _b = (0, react_1.useState)(null), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = (0, react_1.useState)("10"), selectedLimit = _c[0], setSelectedLimit = _c[1];
    var _d = (0, react_1.useState)([]), products = _d[0], setProducts = _d[1];
    var _e = (0, react_1.useState)(1), currentPage = _e[0], setCurrentPage = _e[1];
    var _f = (0, react_1.useState)(0), productsCount = _f[0], setProductsCount = _f[1];
    var _g = (0, react_1.useState)(true), isLoading = _g[0], setIsLoading = _g[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        fetchCategories();
        fetchProducts();
    }, [selectedCategory, selectedLimit, currentPage]);
    var fetchCategories = function () {
        fetch("http://localhost:3001/api/categories")
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var allProductsCategory = {
                id: null,
                name: "Wszystkie produkty",
            };
            setCategories(__spreadArray([allProductsCategory], data, true));
        })
            .catch(function (error) { return console.error("Error fetching categories:", error); });
    };
    var fetchProducts = function () {
        var url = "http://localhost:3001/api/products";
        if (selectedCategory !== null) {
            url += "/category/".concat(selectedCategory);
        }
        if (selectedLimit) {
            url += "?limit=".concat(selectedLimit, "&page=").concat(currentPage);
        }
        setIsLoading(true);
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            console.log(data.data);
            setProducts(data.data);
            setProductsCount(data.totalProducts);
        })
            .catch(function (error) { return console.error("Error fetching products:", error); })
            .finally(function () { return setIsLoading(false); });
    };
    var handleCategorySelect = function (categoryId) {
        setSelectedCategory(categoryId);
        setCurrentPage(1);
    };
    var handleLimitSelect = function (limit) {
        setSelectedLimit(limit);
        setCurrentPage(1);
    };
    var handlePageChange = function (page) {
        setCurrentPage(page);
    };
    var handleProductClick = function (productId) {
        navigate("/product/".concat(productId));
    };
    return (<CommonLayout_1.default header={null} footer={null}>
      <div className="columns">
        <div className="column is-one-quarter">
          <Sidebar_1.default categories={categories} onSelectCategory={handleCategorySelect} onSelectLimit={handleLimitSelect}/>
        </div>
        <div className="column dashboard">
          <h2 className="title is-2">Lista Produktów</h2>
          {isLoading ? (<div className="loader-container">
              <react_loader_spinner_1.DNA visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/>
            </div>) : (<div className="columns products is-multiline">
              {products.map(function (product) { return (<div key={product.id} className="column is-one-third">
                  <div className="box" style={{ cursor: "pointer" }} onClick={function () { return handleProductClick(product.id); }}>
                    <article className="media">
                      <div className="media-content">
                        <figure className="image is-4by3">
                          <img src={product.imgUrl} alt={product.name}/>
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
                </div>); })}
            </div>)}
          <Pagination_1.default currentPage={currentPage} totalPages={Math.ceil(productsCount / parseInt(selectedLimit))} onPageChange={handlePageChange}/>
        </div>
      </div>
    </CommonLayout_1.default>);
};
exports.default = Dashboard;
