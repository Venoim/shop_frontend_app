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
var axios_1 = __importDefault(require("axios"));
var OrdersPage = function (_a) {
    var userData = _a.userData;
    var userId = userData.userData.id;
    var _b = (0, react_1.useState)([]), orders = _b[0], setOrders = _b[1];
    (0, react_1.useEffect)(function () {
        var fetchOrders = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("http://localhost:3001/api/orders/".concat(userId))];
                    case 1:
                        response = _a.sent();
                        setOrders(response.data.orders);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching orders:", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchOrders();
    }, [userId]);
    // Funkcja do grupowania zamówień według order_id
    var groupOrdersByOrderId = function (orders) {
        var groupedOrders = {};
        orders.forEach(function (order) {
            if (!groupedOrders[order.order_id]) {
                groupedOrders[order.order_id] = [];
            }
            groupedOrders[order.order_id].push(order);
        });
        return groupedOrders;
    };
    // Zgrupuj zamówienia według order_id
    var groupedOrders = groupOrdersByOrderId(orders);
    // Funkcja do przekształcenia daty zamówienia
    var formatDate = function (dateString) {
        var date = new Date(dateString);
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        };
        return date.toLocaleString("pl-PL", options);
    };
    // Przekonwertuj obiekt groupedOrders na tablicę i posortuj wg daty zamówienia (od najnowszych do najstarszych)
    var sortedGroupedOrders = Object.entries(groupedOrders).sort(function (a, b) {
        var dateA = new Date(a[1][0].order_date);
        var dateB = new Date(b[1][0].order_date);
        return dateB.getTime() - dateA.getTime();
    });
    return (<div className="box">
      <h2 className="title is-4">Twoje zamówienia</h2>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Numer zamówienia</th>
            <th>Data zamówienia</th>
            <th>Produkty</th>
            <th>Suma</th>
          </tr>
        </thead>
        <tbody>
          {sortedGroupedOrders.map(function (_a) {
            var orderId = _a[0], orderItems = _a[1];
            return (<tr key={orderId}>
              <td>{orderId}</td>
              <td>{formatDate(orderItems[0].order_date)}</td>
              <td>
                <ul>
                  {orderItems.map(function (item) { return (<li key={item.product_id}>
                      {item.product_name} - {item.quantity} szt.
                    </li>); })}
                </ul>
              </td>
              <td>
                {orderItems.reduce(function (total, item) { return total + item.total_price; }, 0)}
              </td>
            </tr>);
        })}
        </tbody>
      </table>
    </div>);
};
exports.default = OrdersPage;
