"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
var CommonLayout_1 = __importDefault(require("../../components/layout/CommonLayout"));
var react_router_dom_1 = require("react-router-dom");
var react_toastify_1 = require("react-toastify");
var react_loader_spinner_1 = require("react-loader-spinner");
require("react-toastify/dist/ReactToastify.css");
var lodash_1 = __importDefault(require("lodash"));
require("./BasketStyle.scss");
var Basket = function (_a) {
    var userData = _a.userData;
    var _b = (0, react_1.useState)([]), basketItems = _b[0], setBasketItems = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var userId = userData === null || userData === void 0 ? void 0 : userData.id;
    console.log(userId);
    (0, react_1.useEffect)(function () {
        var fetchBasketItems = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userId)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3001/api/basket/".concat(userId))];
                    case 2:
                        response = _a.sent();
                        setBasketItems(response.data);
                        setIsLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching basket items:", error_1);
                        react_toastify_1.toast.error("Error fetching basket items:" + error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchBasketItems();
    }, [userId]);
    (0, react_1.useEffect)(function () {
        var storedBasketItems = localStorage.getItem("basketItems");
        if (storedBasketItems !== null) {
            setBasketItems(JSON.parse(storedBasketItems));
        }
    }, []);
    var updateBasketInLocalStorage = function (updatedBasketItems) {
        localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
    };
    var sendUpdatedBasketItemToServer = lodash_1.default.debounce(function (userId, itemId, updatedQuantity) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("przekazywane wartosci", userId, itemId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.put("http://localhost:3001/api/basket/update/", {
                            userId: userId,
                            productId: itemId,
                            quantity: updatedQuantity,
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error updating basket item on the server:", error_2);
                    react_toastify_1.toast.error("Error updating basket item on the server:" + error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, 500);
    var handleQuantityChange = function (itemId, newQuantity) {
        var updatedBasketItems = basketItems.map(function (item) {
            if (item.id === itemId) {
                // Sprawdzamy identyfikator produktu
                return __assign(__assign({}, item), { quantity: newQuantity });
            }
            return item;
        });
        setBasketItems(updatedBasketItems);
        updateBasketInLocalStorage(updatedBasketItems);
        // Asynchroniczne wysyłanie danych na serwer
        sendUpdatedBasketItemToServer(userId, itemId, newQuantity);
    };
    var sendRemoveItemRequestToServer = function (userId, itemId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log(itemId);
                    return [4 /*yield*/, axios_1.default.delete("http://localhost:3001/api/basket/remove/".concat(userId, "/").concat(itemId))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error removing item on the server:", error_3);
                    react_toastify_1.toast.error("Error removing item on the server:" + error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleRemoveItem = function (itemId) {
        react_toastify_1.toast.info("Produkt został usunięty z koszyka.");
        var updatedBasketItems = basketItems.filter(function (item) { return item.id !== itemId; });
        setBasketItems(updatedBasketItems);
        updateBasketInLocalStorage(updatedBasketItems);
        // Asynchroniczne wysyłanie danych na serwer, jeśli userId jest zdefiniowany
        if (userId !== undefined) {
            sendRemoveItemRequestToServer(userId, itemId);
        }
        else {
            react_toastify_1.toast.error("User ID is undefined");
        }
    };
    var totalCost = basketItems.reduce(function (total, item) {
        return total + parseFloat(item.price.toString()) * item.quantity;
    }, 0);
    var handleCheckout = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:3001/api/orders/checkout", { user_id: userId })];
                case 1:
                    response = _a.sent();
                    react_toastify_1.toast.success("Zamówienie zostało złożone pomyślnie!");
                    navigate("/user/orders");
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error during checkout:", error_4);
                    react_toastify_1.toast.error("Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie później.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleIncrementQuantity = function (itemId) {
        handleQuantityChange(itemId, basketItems.find(function (item) { return item.id === itemId; }).quantity + 1);
    };
    var handleDecrementQuantity = function (itemId) {
        var currentQuantity = basketItems.find(function (item) { return item.id === itemId; }).quantity;
        if (currentQuantity > 1) {
            handleQuantityChange(itemId, currentQuantity - 1);
        }
    };
    return (<CommonLayout_1.default header={null} footer={null}>
      <div className="section">
        <react_toastify_1.ToastContainer position="bottom-right"/>
        <div className="container">
          <h2 className="title is-2">Twój koszyk</h2>
          {isLoading ? (<div className="loader-container">
              <react_loader_spinner_1.DNA visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/>
            </div>) : basketItems.length === 0 ? (<p>Koszyk jest pusty.</p>) : (<div className="box">
              <table className="table">
                <thead>
                  <tr>
                    <th>Nazwa produktu</th>
                    <th>Cena</th>
                    <th className="how">Ilość</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {basketItems.map(function (item) { return (<tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td className="quantity">
                        <button className="button is-small" onClick={function () { return handleDecrementQuantity(item.id); }}>
                          -
                        </button>
                        <input type="text" className="input is-small quantity" value={item.quantity} onChange={function (e) {
                    return handleQuantityChange(item.id, parseInt(e.target.value));
                }} min="1"/>
                        <button className="button is-small" onClick={function () { return handleIncrementQuantity(item.id); }}>
                          +
                        </button>
                      </td>
                      <td>
                        <button className="button is-danger is-small" onClick={function () { return handleRemoveItem(item.id); }}>
                          Usuń
                        </button>
                      </td>
                    </tr>); })}
                </tbody>
                <tfoot className="total-cost">
                  <tr>
                    <td>Suma:</td>
                    <td> {totalCost.toFixed(2)} zł</td>
                    <td></td>
                    <td>
                      <button className="button is-success" onClick={function () { return handleCheckout(userId !== null && userId !== void 0 ? userId : 0); }}>
                        Kup
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>)}
        </div>
      </div>
    </CommonLayout_1.default>);
};
exports.default = Basket;
