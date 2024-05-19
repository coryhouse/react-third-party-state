import React from "react";
import ReactDOM from "react-dom/client";
import Routes from "./Routes";
import { CartProvider } from "./context/cartContext";
import "./main.css";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/userContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Sorry, an error occurred.</h1>}>
      <CartProvider>
        <UserProvider>
          <Toaster />
          <Routes />
        </UserProvider>
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
