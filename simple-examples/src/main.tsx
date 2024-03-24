import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ZustandCounter } from "./Zustand.tsx";
import { ValtioCounter } from "./Valtio.tsx";
import { JotaiCounter } from "./Jotai.tsx";
import { ZustandReduxCounter } from "./ZustandRedux.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ZustandCounter />
    <ZustandReduxCounter />
    <ValtioCounter />
    <JotaiCounter />
  </React.StrictMode>
);
