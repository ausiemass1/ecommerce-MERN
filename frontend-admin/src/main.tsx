import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import App from "./App.tsx";
// import React from "react";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
     </ErrorBoundary>
  // </React.StrictMode>
);
