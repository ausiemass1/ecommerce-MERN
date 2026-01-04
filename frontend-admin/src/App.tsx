import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AdminNavbar from "./components/NavBar";
import AdminFooter from "./components/AdminFooter";

const App = () => {
  return (
    <>
      <div className="app-layout">
        <AdminNavbar />
        <main className="main-content">
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/login" element={<Login />} />
          </Routes>
        </main>
        <AdminFooter />
      </div>
    </>
  );
};

export default App;
