import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

function Navbar() {
  useEffect(() => {
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns);
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    logout();
  }

  return (
    <>
      {/* Dropdown Structure */}
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li className="divider"></li>
        <li>
          <Link to="/logout" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>

      {/* Navbar */}
      <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper">
          {/* Logo */}
          <Link to="/" className="brand-logo">
            Logo
          </Link>

          <ul className="right hide-on-med-and-down">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
          <Link to="/logout" onClick={handleLogout}>Logout</Link>
        </li>

            <li>
              <Link to="/products">Products</Link>
            </li>

            {/* Dropdown Trigger */}
            <li>
              <a className="dropdown-trigger" href="#!" data-target="dropdown1">
                Account
                <i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    </>
  );
}

export default Navbar;
