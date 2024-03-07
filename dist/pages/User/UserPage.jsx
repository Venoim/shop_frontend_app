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
var UserSidebar_1 = __importDefault(require("../../components/UserSidebar/UserSidebar"));
var react_router_dom_1 = require("react-router-dom");
var OrdersPage_1 = __importDefault(require("./Orders/OrdersPage"));
var DataPage_1 = __importDefault(require("./Data/DataPage"));
require("bulma/css/bulma.min.css");
require("./UserPageStyle.scss");
var UserPage = function (_a) {
    var userData = _a.userData, onLogout = _a.onLogout;
    var _b = (0, react_1.useState)(null), fetchedUserData = _b[0], setFetchedUserData = _b[1];
    (0, react_1.useEffect)(function () {
        var fetchUserData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var id_1, response, userDataFromServer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userData) return [3 /*break*/, 7];
                        id_1 = userData.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, fetch("http://localhost:3001/api/users/".concat(id_1))];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        userDataFromServer = _a.sent();
                        setFetchedUserData(userDataFromServer);
                        return [3 /*break*/, 5];
                    case 4:
                        console.error("Wystąpił błąd podczas pobierania danych użytkownika.");
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error("Wystąpił błąd podczas pobierania danych użytkownika:", error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        fetchUserData();
    }, [userData]);
    if (!userData) {
        return <div>Nie jesteś zalogowany</div>;
    }
    var name = userData.name, surname = userData.surname, email = userData.email, id = userData.id;
    return (<CommonLayout_1.default header={null} footer={null}>
      <div className="columns">
        <div className="column is-one-quarter">
          <UserSidebar_1.default onLogout={onLogout}/>
        </div>
        <div className="container">
          <div className="content page">
            <h2 className="title">Profil użytkownika</h2>
            <p>
              <strong>ID:</strong> {id} <strong>Email:</strong> {email}
            </p>
          </div>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/orders" element={<OrdersPage_1.default userData={{ userData: userData }}/>}/>
            <react_router_dom_1.Route path="/data" element={<DataPage_1.default userData={userData}/>}/>
            {/* <Route path="/set" element={<AccountSettingsPage />} /> */}
          </react_router_dom_1.Routes>
        </div>
      </div>
    </CommonLayout_1.default>);
};
exports.default = UserPage;
