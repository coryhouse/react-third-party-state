import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./cartContext";
import "./main.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
