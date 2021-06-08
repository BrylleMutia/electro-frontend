import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import axios from "axios";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

// AXIOS GLOBAL DEFAULTS
// axios.defaults.baseURL = "https://electro-ecommerce.herokuapp.com/api";
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Accept"] = "application/json";
// axios.defaults.withCredentials = true;

// let token = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

// if (token) {
//   axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
// } else {
//   console.error("CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token");
// }

// retrieve token then add to request headers
// axios.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
