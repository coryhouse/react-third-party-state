import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { CartProvider } from "./cartContext";
import "./main.css";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Sorry, an error occurred.</h1>}>
      <CartProvider>
        <RecoilRoot>
          <Routes />
        </RecoilRoot>
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
