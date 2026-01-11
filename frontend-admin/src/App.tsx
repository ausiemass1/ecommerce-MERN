import { Routes, Route,  Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
// import Navbar from "./components/NavBar";
import AdminFooter from "./components/AdminFooter";
import Orders from "./pages/Orders";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import AdminAuthLayout from "./layouts/AdminAuthlayouts";
import AdminLayout from "./layouts/AdminLyout";

const App = () => {
  return (
    <>
      <div className="app-layout">
        
        {/* <main className="main-content">
          <Routes>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/orders/:id" element={<OrderDetailsPage />} />
          </Routes>
        </main> */}
         <main className="main-content">
         <Routes>
        {/* Login – NO navbar */}
        <Route element={<AdminAuthLayout />}>
          <Route path="/admin/login" element={<Login />} />
        </Route>

        {/* Admin – WITH navbar */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/:id" element={<OrderDetailsPage />} />
        </Route>

        {/* Optional redirect */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
      </main>

    
        <AdminFooter />
      </div>
    </>
  );
};

export default App;
