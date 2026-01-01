import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css";

function Navbar() {
  useEffect(() => {
    const dropdowns = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(dropdowns);

    const sidenavs = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenavs);
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    logout();
  
  };

  

  const closeSidenav = () => {
    const sidenavElem = document.querySelector(".sidenav");
  
    if (!sidenavElem) return;
  
    const instance = M.Sidenav.getInstance(sidenavElem);
    instance?.close();
  };
  
  

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
          <Link to="/logout" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
      {/* Mobile side Nav */}
      <ul className="sidenav" id="mobile-menu">
        <li>
          <Link to="/" onClick={closeSidenav}>Home</Link>
        </li>
        <li>
          <Link to="/products" onClick={closeSidenav}>Products</Link>
        </li>
        <li>
          <Link to="/register" onClick={closeSidenav}>Register</Link>
        </li>
        <li>
          <Link to="/login" onClick={closeSidenav}>Login</Link>
        </li>
        <li>
          <a href="#!" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>

      {/* Navbar */}
      <div className="navbar-fixed">
        <nav className="custom-navbar">
          <div className="nav-wrapper container">
            <a href="#" data-target="mobile-menu" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>

            <Link to="/" className="brand-logo">
              Logo
            </Link>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/logout" onClick={handleLogout}>
                  Logout
                </Link>
              </li>

              <li>
                <a
                  className="dropdown-trigger"
                  href="#!"
                  data-target="dropdown1"
                >
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
