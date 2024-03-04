import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ZustandCounter } from "./Zustand.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ZustandCounter />
  </React.StrictMode>
);
