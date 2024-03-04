import React from "react";
import ReactDOM from "react-dom/client";
// Supports weights 300-800
import "@fontsource-variable/open-sans";

import "./main.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
