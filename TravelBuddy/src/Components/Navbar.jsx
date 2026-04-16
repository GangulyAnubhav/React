import { Link, NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import './Navbar.css';

export default function Navbar() {

  const token = Cookies.get("token");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">✈️ TravelBuddy</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {/* ✅ LEFT SIDE MENU */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {token && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                </>
              )}

            </ul>

            {/* ✅ RIGHT SIDE BUTTONS */}
            <div className="d-flex">

              {/* ❌ Show when NOT logged in */}
              {!token && (
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
              )}

              {/* ✅ Show when logged in */}
              {token && (
                <button
                  className="btn btn-danger mt-1"
                  onClick={() => {
                    Cookies.remove("token");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>
              )}

            </div>

          </div>
        </div>
      </nav>
    </div>
  );
}