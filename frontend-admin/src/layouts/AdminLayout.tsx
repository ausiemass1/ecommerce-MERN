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
     
     
      {/* Shared container BELOW navbar */}
      <div className="admin-body">
        <div className="row admin-layout">
          {/* SIDEBAR */}
          <div className="col s12 m3 l2">
            <AdminSidebar />
          </div>

          {/* MAIN CONTENT */}
          <div className="col s12 m9 l10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
