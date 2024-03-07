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
Object.defineProperty(exports, "__esModule", { value: true });
// AccountSettingsPage.js
var react_1 = __importStar(require("react"));
var AccountSettingsPage = function () {
    // Stan dla ustawień konta
    var _a = (0, react_1.useState)({
        changePassword: false,
        notifications: true,
    }), settings = _a[0], setSettings = _a[1];
    // Funkcje obsługujące zmianę ustawień konta
    return (<div className="box">
      <h2 className="title is-4">Ustawienia konta</h2>
      <div className="field">
        <input id="changePassword" type="checkbox" className="switch is-rounded is-info" checked={settings.changePassword} onChange={function () {
            return setSettings(function (prevSettings) { return (__assign(__assign({}, prevSettings), { changePassword: !prevSettings.changePassword })); });
        }}/>
        <label htmlFor="changePassword">Zmień hasło</label>
      </div>
      <div className="field">
        <input id="notifications" type="checkbox" className="switch is-rounded is-info" checked={settings.notifications} onChange={function () {
            return setSettings(function (prevSettings) { return (__assign(__assign({}, prevSettings), { notifications: !prevSettings.notifications })); });
        }}/>
        <label htmlFor="notifications">Otrzymuj powiadomienia</label>
      </div>
      {/* Dodaj więcej opcji ustawień konta */}
    </div>);
};
exports.default = AccountSettingsPage;
