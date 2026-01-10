import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import M from "materialize-css";

function Navbar() {
  const navigate = useNavigate();

  // ✅ React-safe auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(localStorage.getItem("token"))
  );

  // ✅ Init Materialize ONCE
  useEffect(() => {
    M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"), {
      constrainWidth: false,
      coverTrigger: false,
    });

    M.Sidenav.init(document.querySelectorAll(".sidenav"));

    // ✅ Sync login/logout across tabs
    const onStorageChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  // ✅ Logout handler
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // ✅ Close sidenav on mobile click
  const closeSidenav = () => {
    const elem = document.querySelector(".sidenav");
    const instance = elem ? M.Sidenav.getInstance(elem) : null;
    instance?.close();
  };

  return (
    <>
      {/* ===== Account Dropdown ===== */}
      <ul id="account-dropdown" className="dropdown-content">
        <li key="profile">
          <Link to="/profile">Profile</Link>
        </li>
        <li key="settings">
          <Link to="/settings">Settings</Link>
        </li>
        <li className="divider" />
        <li key="logout">
          <a href="#!" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>

      {/* ===== Mobile Sidenav ===== */}
      <ul className="sidenav" id="mobile-menu">
        <li key="m-home">
          <Link to="/" onClick={closeSidenav}>Home</Link>
        </li>

        <li key="m-products">
          <Link to="/products" onClick={closeSidenav}>Products</Link>
        </li>

        {!isLoggedIn && (
          <>
            <li key="m-register">
              <Link to="/register" onClick={closeSidenav}>Register</Link>
            </li>
            <li key="m-login">
              <Link to="/login" onClick={closeSidenav}>Login</Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <li key="m-logout">
            <a href="#!" onClick={handleLogout}>Logout</a>
          </li>
        )}
      </ul>

      {/* ===== Desktop Navbar ===== */}
      <div className="navbar-fixed">
        <nav className="custom-navbar">
          <div className="nav-wrapper container">
            <a
              href="#!"
              data-target="mobile-menu"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </a>

            <Link to="/" className="brand-logo">
              Logo
            </Link>

            <ul className="right hide-on-med-and-down">
              <li key="home">
                <Link to="/">Home</Link>
              </li>

              <li key="products">
                <Link to="/products">All Products</Link>
              </li>

              <li key="cart">
                <Link to="/cart">Cart</Link>
              </li>

              {/* Logged out */}
              {!isLoggedIn && (
                <>
                  <li key="register">
                    <Link to="/register">Register</Link>
                  </li>
                  <li key="login">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}

              {/* Logged in (never unmounted, only hidden) */}
              <li
                key="account"
                style={{ display: isLoggedIn ? "block" : "none" }}
              >
                <a
                  href="#!"
                  className="dropdown-trigger"
                  data-target="account-dropdown"
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
