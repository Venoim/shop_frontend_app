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
var react_router_dom_1 = require("react-router-dom");
var CommonLayout_1 = __importDefault(require("../components/layout/CommonLayout"));
var Header_1 = __importDefault(require("../components/layout/header/Header"));
var Home_1 = __importDefault(require("./Home/Home"));
var ProductPage_1 = __importDefault(require("./Product/ProductPage"));
var Dashboard_1 = __importDefault(require("./Dashboard/Dashboard"));
var login_form_1 = __importDefault(require("./Login/login_form"));
var UserPage_1 = __importDefault(require("./User/UserPage"));
var registration_form_1 = __importDefault(require("./Registration/registration_form"));
var email_verification_form_1 = __importDefault(require("./ConfirmEmail/email_verification_form"));
var Basket_1 = __importDefault(require("./Basket/Basket"));
require("./Root.css");
function Root() {
    var _a = (0, react_1.useState)(false), isUserLoggedIn = _a[0], setIsUserLoggedIn = _a[1];
    var _b = (0, react_1.useState)(null), userData = _b[0], setUserData = _b[1];
    (0, react_1.useEffect)(function () {
        var storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            var parsedUserData = JSON.parse(storedUserData);
            setIsUserLoggedIn(true);
            setUserData(parsedUserData);
        }
    }, []);
    var handleLogin = function (userData) {
        setIsUserLoggedIn(true);
        setUserData(userData);
    };
    var handleLogout = function () {
        setIsUserLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("userData");
    };
    return (<react_router_dom_1.BrowserRouter>
      <CommonLayout_1.default header={<Header_1.default isUserLoggedIn={isUserLoggedIn} onLogout={handleLogout}/>} footer={null}>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
          <react_router_dom_1.Route path="/product/:id" element={<ProductPage_1.default userData={userData}/>}/>
          <react_router_dom_1.Route path="/products" element={<Dashboard_1.default />}/>
          <react_router_dom_1.Route path="/login" element={<login_form_1.default onLogin={handleLogin}/>}/>
          <react_router_dom_1.Route path="/user/*" element={userData ? (<UserPage_1.default userData={userData.userData} onLogout={handleLogout}/>) : null}/>
          <react_router_dom_1.Route path="/register" element={<registration_form_1.default />}/>
          <react_router_dom_1.Route path="/confirm-email" element={<email_verification_form_1.default />}/>
          <react_router_dom_1.Route path="/basket" element={<Basket_1.default userData={userData ? userData.userData : null}/>}/>
        </react_router_dom_1.Routes>
      </CommonLayout_1.default>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = Root;
