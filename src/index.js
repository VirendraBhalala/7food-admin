import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Provider
import store from "./redux/store"; // store
import App from "./App"; // App
import "./index.css"; // css

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
