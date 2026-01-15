import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import M from "materialize-css";


// ✅ AdminNavbar
const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  useEffect(() => {
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
  }, []);

  return (
    <nav className="blue-grey darken-3">
      <div className="nav-wrapper container">

        {/* MOBILE MENU ICON (must be OUTSIDE desktop-only ul) */}
        <a
          href="#!"
          data-target="admin-sidenav"
          className="sidenav-trigger righthide-on-large-only"
        >
          <i className="material-icons">menu</i>
        </a>
  
        {/* Logo */}
        <Link to="/admin/dashboard" className="brand-logo">
        <img src={logo} alt="Admin Logo" className="nav-logo" />
        </Link>

        {/* MOBILE SIDENAV */}
        <ul id="admin-sidenav" className="sidenav">
          <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/admin/users">Users</NavLink></li>
          <li><NavLink to="/admin/orders">Orders</NavLink></li>
          <li><NavLink to="/admin/products">Products</NavLink></li>
          <li><a href="#!" onClick={logout}>Logout</a></li>
        </ul>

        {/* DESKTOP NAV */}
        <ul className="right hide-on-med-and-down">
          <li><NavLink to="/admin/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/admin/users">Users</NavLink></li>
          <li><NavLink to="/admin/products">Products</NavLink></li>
          <li><NavLink to="/admin/orders">Orders</NavLink></li>
          <li>
            <a href="#!" onClick={logout}>Logout</a>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default AdminNavbar;
