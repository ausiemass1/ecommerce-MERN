
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import "./App.css"
import App from './App.tsx'
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
