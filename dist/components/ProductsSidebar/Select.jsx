"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Select = function (_a) {
    var options = _a.options, onSelect = _a.onSelect;
    return (<select onChange={function (e) { return onSelect(e.target.value); }}>
      {options.map(function (option) { return (<option key={option} value={option}>
          {option}
        </option>); })}
    </select>);
};
exports.default = Select;
