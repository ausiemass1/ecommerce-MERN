import { Routes, Route,  Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import AdminFooter from "./components/AdminFooter";
import Orders from "./pages/Orders";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import AdminAuthLayout from "./layouts/AdminAuthlayouts";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  return (
    <>
      <div className="app-layout">
        
         <main className="main-content">
         <Routes>
        {/* Login – NO navbar */}
        <Route element={<AdminAuthLayout />}>
          <Route path="/admin/login" element={<Login />} />
        </Route>

        {/* Admin – WITH navbar */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
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
