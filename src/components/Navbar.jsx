import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./navbar.css";

export default function Navbar() {
  const { user, loginWithTwitter, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light px-3 shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand text-dark px-3 fs-1 fw-bold" to="/">
          MEGAETH
        </Link>
        <button
          className="navbar-toggler text-black border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
          aria-controls="navContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-black bg-black" />
        </button>
        <div className="collapse navbar-collapse" id="navContent">
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-3">
            <ul className="navbar-nav flex-column flex-lg-row align-items-start align-items-lg-center gap-2 mb-2 mb-lg-0">
              {user && (
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark fw-semibold"
                    to="/creator"
                  >
                    <u>Upload content</u>
                  </Link>
                </li>
              )}
            </ul>
            <form
              className="d-flex flex-column flex-sm-row gap-2"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="form-control border-3 rounded-pill px-4 py-2"
                placeholder="Search"
                style={{ width: "300px" }}
              />
              <button
                className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
                type="submit"
              >
                Search
              </button>
            </form>
            <div className="d-flex flex-column flex-sm-row align-items-center gap-2 justify-content-end">
              {user ? (
                <>
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="rounded-circle border border-2 border-primary shadow-sm mb-2 mb-sm-0"
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    className="text-dark fw-semibold me-2 d-none d-md-inline text-truncate"
                    style={{ maxWidth: "120px" }}
                    title={user.displayName}
                  >
                    {user.displayName}
                  </span>
                  <button
                    onClick={logout}
                    className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold w-100 w-sm-auto"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={loginWithTwitter}
                  className="btn btn-primary btn-sm rounded-pill px-3 fw-semibold w-100 w-sm-auto"
                >
                  Sign in with Twitter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
