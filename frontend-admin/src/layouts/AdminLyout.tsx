import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { isAdminLoggedIn } from "../../../backend/src/utils/adminAuth";

const AdminLayout = () => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
