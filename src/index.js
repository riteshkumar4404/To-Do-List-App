import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { IntlProvider } from "react-intl";

ReactDOM.render(
  <IntlProvider locale="hi">
    <App />
  </IntlProvider>,
  // document.getElementById("root")
  document.getElementById("root") || document.createElement("div")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
