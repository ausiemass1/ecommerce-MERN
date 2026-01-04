
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css'
import "./App.css"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
