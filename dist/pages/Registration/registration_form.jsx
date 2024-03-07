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
var react_toastify_1 = require("react-toastify");
var CommonLayout_1 = __importDefault(require("../../components/layout/CommonLayout"));
require("react-toastify/dist/ReactToastify.css");
require("bulma/css/bulma.min.css");
require("./registration_form.css");
var urlSerwer = "http://localhost:3001/api/users/register";
var RegistrationForm = function () {
    var _a = (0, react_1.useState)({
        email: "",
        password: "",
        confirmPassword: "",
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(false), registrationSuccess = _b[0], setRegistrationSuccess = _b[1];
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = value, _a)));
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var emailExistsResponse, emailExistsResult, registerResponse, passwordRegex, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/users/check-email", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email: formData.email }),
                        })];
                case 2:
                    emailExistsResponse = _a.sent();
                    if (!emailExistsResponse.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, emailExistsResponse.json()];
                case 3:
                    emailExistsResult = _a.sent();
                    if (emailExistsResult.exists) {
                        console.error("Podany email jest już używany.");
                        react_toastify_1.toast.error("Podany email jest już używany.");
                        return [2 /*return*/]; // Przerwij rejestrację, gdy email już istnieje
                    }
                    return [3 /*break*/, 5];
                case 4:
                    console.error("Błąd podczas sprawdzania emaila");
                    react_toastify_1.toast.error("Błąd podczas sprawdzania emaila");
                    return [2 /*return*/];
                case 5:
                    // Sprawdzenie, czy hasła są takie same
                    if (formData.password !== formData.confirmPassword) {
                        console.error("Hasła muszą być takie same.");
                        react_toastify_1.toast.error("Hasła muszą być takie same.");
                        return [2 /*return*/]; // Przerwij rejestrację, gdy hasła są różne
                    }
                    return [4 /*yield*/, fetch(urlSerwer, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(formData),
                        })];
                case 6:
                    registerResponse = _a.sent();
                    if (registerResponse.ok) {
                        console.log("Użytkownik zarejestrowany pomyślnie");
                        setRegistrationSuccess(true); // Ustawienie stanu na sukces po pomyślnej rejestracji
                        react_toastify_1.toast.success("Użytkownik zarejestrowany pomyślnie");
                        setFormData({
                            email: "",
                            password: "",
                            confirmPassword: "",
                        });
                    }
                    else {
                        passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
                        if (!passwordRegex.test(formData.password)) {
                            console.error("Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny.");
                            react_toastify_1.toast.error("Hasło musi zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny.");
                            return [2 /*return*/];
                        }
                    }
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error("Błąd połączenia z serwerem:", error_1);
                    react_toastify_1.toast.error("Błąd połączenia z serwerem:" + error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    var handleCancel = function () {
        // Anulowanie Rejestracji
        console.log("Anulowano rejestrację");
    };
    return (<CommonLayout_1.default header={null} footer={null}>
      <div className="container registerBox">
        <react_toastify_1.ToastContainer position="bottom-right"/>
        <form className="box" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required/>
            </div>
          </div>

          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input className="input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required/>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-primary">
                Register
              </button>
            </div>
            <div className="control">
              <button type="button" className="button is-danger" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </form>
        {registrationSuccess && (<div className="notification is-success">
            Użytkownik został zarejestrowany pomyślnie.
            <br />
            <a className="verification button is-link" href="/confirm-email">
              Przejdz weryfikacji emila
            </a>
          </div>)}
      </div>
    </CommonLayout_1.default>);
};
exports.default = RegistrationForm;
