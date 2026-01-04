import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/NavBar";
const AdminLayout = () => {
  return (
    <div>
        <AdminNavbar/>
      <header>Admin Panel</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
