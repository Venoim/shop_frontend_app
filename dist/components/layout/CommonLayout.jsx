"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var CommonLayout = function (_a) {
    var header = _a.header, footer = _a.footer, children = _a.children;
    return (<div className="common-layout">
      {header && <header>{header}</header>}
      <main>{children}</main>
      {footer && <footer>{footer}</footer>}
    </div>);
};
exports.default = CommonLayout;
