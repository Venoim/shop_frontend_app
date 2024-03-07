"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("./index.css");
var Root_1 = __importDefault(require("./pages/Root"));
var reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
var logrocket_1 = __importDefault(require("logrocket"));
var logrocket_react_1 = __importDefault(require("logrocket-react"));
logrocket_1.default.init("sgkwmc/as-example-react-shop");
(0, logrocket_react_1.default)(logrocket_1.default);
var handleWebVitals = function (metric) {
    console.log(metric.name, metric.value);
    // tutaj możesz wykonać dodatkowe operacje na metryce wydajności
};
react_dom_1.default.render(<react_1.default.StrictMode>
    <Root_1.default />
  </react_1.default.StrictMode>, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)(handleWebVitals);
