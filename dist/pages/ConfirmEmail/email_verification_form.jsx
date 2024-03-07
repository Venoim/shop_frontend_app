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
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var axios_1 = __importDefault(require("axios"));
var EmailVerificationForm = function () {
    var _a = (0, react_1.useState)(""), email = _a[0], setEmail = _a[1];
    var _b = (0, react_1.useState)(""), confirmationCode = _b[0], setConfirmationCode = _b[1];
    var _c = (0, react_1.useState)(""), errorMessage = _c[0], setErrorMessage = _c[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post("http://localhost:3001/api/users/confirm-email", { email: email, confirmationCode: confirmationCode })];
                case 2:
                    response = _a.sent();
                    console.log(response.data); // Zalogowanie odpowiedzi z serwera po potwierdzeniu e-maila
                    react_toastify_1.toast.success("Potwierdzanie adresu e-mail zakończone sukcesem");
                    navigate("/login");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    // console.error("Błąd podczas potwierdzania adresu e-mail:", error);
                    // setErrorMessage("Błąd podczas potwierdzania adresu e-mail");
                    react_toastify_1.toast.error("Błąd podczas potwierdzania adresu e-mail");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<CommonLayout_1.default header={null} footer={null}>
      <div className="container box" style={{ marginTop: "3rem" }}>
        <react_toastify_1.ToastContainer position="bottom-right"/>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Adres e-mail</label>
            <div className="control">
              <input className="input" type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }} required/>
            </div>
          </div>
          <div className="field">
            <label className="label">Kod weryfikacyjny</label>
            <div className="control">
              <input className="input" type="text" value={confirmationCode} onChange={function (e) { return setConfirmationCode(e.target.value); }} required/>
            </div>
          </div>
          {/* {errorMessage && <p className="has-text-danger">{errorMessage}</p>} */}
          <div className="field">
            <div className="control">
              <button className="button is-primary" type="submit">
                Potwierdź adres e-mail
              </button>
            </div>
          </div>
        </form>
      </div>
    </CommonLayout_1.default>);
};
exports.default = EmailVerificationForm;
