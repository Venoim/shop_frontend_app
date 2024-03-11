import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Root from "./pages/Root";
import reportWebVitals from "./reportWebVitals";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

LogRocket.init("sgkwmc/as-example-react-shop");

setupLogRocketReact(LogRocket);

const handleWebVitals = (metric: any) => {
  console.log(metric.name, metric.value);
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(handleWebVitals);
