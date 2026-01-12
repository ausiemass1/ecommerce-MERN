
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <ul className="collection">
        <li className="collection-item active">Dashboard</li>

        <li className="collection-item">
          <NavLink to="/admin">Dashboard</NavLink>
        </li>

        <li className="collection-item">
          <NavLink to="/admin/products">Products</NavLink>
        </li>

        <li className="collection-item">
          <NavLink to="/admin/orders">Orders</NavLink>
        </li>

        <li className="collection-item">
          <NavLink to="/admin/users">Users</NavLink>
        </li>

      </ul>
    </aside>
  );
};

export default AdminSidebar;

