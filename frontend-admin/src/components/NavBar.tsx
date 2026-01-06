import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <nav className="blue-grey darken-3">
      <div className="nav-wrapper ">
        {/* Logo */}
        <Link to="/admin" className="brand-logo">
          Admin
        </Link>

        {/* Desktop links */}
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <a href="#!" onClick={logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
