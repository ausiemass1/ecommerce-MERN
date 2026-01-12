import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { isAdminLoggedIn } from "../../../backend/src/utils/adminAuth";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <>
      <Navbar/>
     
     
      <div className="row admin-layout">
        {/* LEFT SIDEBAR – ALWAYS THE SAME */}
        <div className="col s12 m3 l2">
          <AdminSidebar />
        </div>

        {/* PAGE CONTENT */}
        <div className="col s12 m9 l10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
