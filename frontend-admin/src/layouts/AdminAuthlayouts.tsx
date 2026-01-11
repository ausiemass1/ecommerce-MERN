import { Outlet } from "react-router-dom";

const AdminAuthLayout = () => {
  return (
    <div className="admin-auth-layout">
      <Outlet />
    </div>
  );
};

export default AdminAuthLayout;
