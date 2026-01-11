// components/AdminSidebar.tsx
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul className="collection">
        <li className="collection-item active">Dashboard</li>

        <li className="collection-item">
          <Link to="/admin/products">Products</Link>
        </li>

        <li className="collection-item">
          <Link to="/admin/orders">Orders</Link>
        </li>

        <li className="collection-item">
          <Link to="/admin/users">Users</Link>
        </li>

        <li className="collection-item divider" />

        <li className="collection-item">
          <strong>Filters</strong>
        </li>

        <li className="collection-item">
          <label>
            <input type="checkbox" />
            <span>Active Orders</span>
          </label>
        </li>

        <li className="collection-item">
          <label>
            <input type="checkbox" />
            <span>Out of Stock</span>
          </label>
        </li>

        <li className="collection-item">
          <label>
            <input type="checkbox" />
            <span>Admin Only</span>
          </label>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
