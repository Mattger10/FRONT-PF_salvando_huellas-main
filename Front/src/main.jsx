import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import axios from "axios";

//Para el deploy descomentar:

//axios.defaults.baseURL = "https://pfsalvandohuellas-production.up.railway.app/"

// Para trabajar local descomentar:

 axios.defaults.baseURL = "http://localhost:3001/" 



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="dev-6pq6octrh78p8x1u.us.auth0.com"
          clientId="QL9DeKpTUonqfQLxcTjjNZWGVk8SMfiW"
          redirectUri={`${window.location.origin}/home`}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
