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
var CommonLayout_1 = __importDefault(require("../../components/layout/CommonLayout"));
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
require("./ProductPageStyle.scss");
var react_loader_spinner_1 = require("react-loader-spinner");
var lodash_1 = __importDefault(require("lodash"));
var ProductPage = function (_a) {
    var userData = _a.userData;
    var _b = (0, react_1.useState)(null), product = _b[0], setProduct = _b[1];
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    var id = (0, react_router_dom_1.useParams)().id;
    (0, react_1.useEffect)(function () {
        var fetchProduct = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        console.log("Pobieram dane produktu");
                        return [4 /*yield*/, fetch("http://localhost:3001/api/products/".concat(id), {
                                method: "GET",
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Błąd podczas pobierania danych produktu");
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (data.result && data.result.length > 0) {
                            setProduct(data.result[0]);
                            setError(null);
                        }
                        else {
                            throw new Error("Brak danych produktu");
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Błąd podczas pobierania danych produktu:", error_1);
                        setError("Błąd podczas pobierania danych produktu");
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchProduct();
    }, [id]);
    var handleAddToCart = lodash_1.default.debounce(function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!(userData === null || userData === void 0 ? void 0 : userData.userData.id)) {
                        react_toastify_1.toast.error("Musisz być zalogowany, aby dodać produkt do koszyka.");
                        return [2 /*return*/];
                    }
                    react_toastify_1.toast.success("Produkt dodany do koszyka!");
                    return [4 /*yield*/, axios_1.default.post("http://localhost:3001/api/basket/add", {
                            userId: userData.userData.id,
                            productId: product === null || product === void 0 ? void 0 : product.id,
                            quantity: 1,
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Error adding product to cart:", error_2);
                    react_toastify_1.toast.error("Wystąpił błąd podczas dodawania produktu do koszyka.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, 200);
    return (<CommonLayout_1.default header={null} footer={null}>
      <div className="container box productPage">
        {isLoading ? (<div className="loader-container">
            <react_loader_spinner_1.DNA visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper"/>
          </div>) : (<div className="columns">
            <react_toastify_1.ToastContainer position="bottom-right"/>
            <div className="column is-half">
              <p>ID: {product === null || product === void 0 ? void 0 : product.id}</p>
              <h1 className="title">{product === null || product === void 0 ? void 0 : product.name}</h1>
              <div className="box">
                <p>Opis: {product === null || product === void 0 ? void 0 : product.description}</p>
              </div>
              <div>
                <p className="price">Cena: {product === null || product === void 0 ? void 0 : product.price} zł</p>
                <button className="basket button is-primary" onClick={handleAddToCart}>
                  Dodaj do koszyka
                </button>
              </div>
            </div>
            {(product === null || product === void 0 ? void 0 : product.imgUrl) && (<div className="column is-half">
                <figure className="image is-4by3">
                  <img src={product === null || product === void 0 ? void 0 : product.imgUrl} alt={product === null || product === void 0 ? void 0 : product.name}/>
                </figure>
              </div>)}
          </div>)}
      </div>
    </CommonLayout_1.default>);
};
exports.default = ProductPage;
