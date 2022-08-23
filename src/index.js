import React from "react";
import ReactDOM from "react-dom/client";

// Dependencies
import { Provider } from "react-redux";

// Store
import store from "./redux/store";

// App
import App from "./App";

// Root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
