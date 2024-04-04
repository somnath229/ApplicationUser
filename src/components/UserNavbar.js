import { useContext, useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import LoginContext from "../context/LoginContext";

const UserNavbar = () => {
  let history = useNavigate();
  let location = useLocation();
  const [userName, setUserName] = useState(""); // State to store user's first name

  const context = useContext(LoginContext);
  const { logout } = context;

  useEffect(() => {
    // Retrieve user's first name from local storage
    const firstName = localStorage.getItem("firstName");
    if (firstName) {
      setUserName(firstName);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    console.log("logging out...")
    history("/signin");
  };


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <Link className="navbar-brand ms-2" to="/">
            <i className="fa-regular fa-note-sticky"></i> Application
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/About">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex me-3" role="search">
                <Link
                  className="btn btn-outline-light"
                  to="/signin"
                  role="button">
                  Sign in
                </Link>
                <Link
                  className="btn btn-outline-light ms-2"
                  to="/signup"
                  role="button">
                  Sign up
                </Link>
              </form>
            ) : (
              <>
                <p className="text-light m-2">Signed in as: {userName}</p>
                <SearchBar />
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light">
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
