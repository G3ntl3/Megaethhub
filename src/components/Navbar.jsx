import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import './navbar.css'
export default function Navbar() {
  const { user, loginWithTwitter, logout } = useAuth(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-light px-3">
      <div className="container-fluid">
        <Link className="navbar-brand text-dark px-5 fs-1 fw-bold" to="/">
          MEGAETH
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/creator">
                 <u>Upload content </u> 
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (<>
              
                  <input type='text' className='py-2 px-4 border-3 rounded' placeholder="Search" /> <button className="btn btn-outline-primary ms-2"> Search </button>
               
            </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="rounded-circle me-2"
                  style={{ width: "30px", height: "30px" }}
                />
                <span className="text-dark me-3">{user.displayName}</span>
                <button
                  onClick={logout}
                  className="btn btn-outline-dark btn-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={loginWithTwitter}
                className="btn btn-primary btn-sm"
              >
                Sign in with Twitter
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
