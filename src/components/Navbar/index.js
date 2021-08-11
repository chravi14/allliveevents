import React, { useRef } from "react";
import "./Navbar.css";
import logo from "./../../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

const Navbar = () => {
  const { currentUser, signout, token } = useAuth();
  const loginBtn = useRef();
  const history = useHistory();
  console.log(currentUser);

  const handleSignout = () => {
    signout().then((res) => {
      history.push("/admin");
    });
  };

  const showPayWall = (event) => {
    event.preventDefault();
    console.log(event.target);
    if (loginBtn.current.innerText === "Join Now / Login") {
      loginBtn.current.click();
    } else {
      history.push("/tournaments");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link to="/" className="navbar-brand">
        <img src={logo} height="30" alt="" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/tournaments"
              onClick={showPayWall}
              className="nav-link"
            >
              Tournaments
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/meetings">
              Meetings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/events" className="nav-link">
              Events
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/schools" className="nav-link">
              Schools
            </NavLink>
          </li>

          {/* {!currentUser ? (<li className="nav-item">
                        <NavLink to="/admin" className="nav-link">Admin</NavLink>
                    </li>) : (<> */}
          {currentUser && (
            <>
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/logout"
                  className="nav-link"
                  onClick={handleSignout}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
          <li className="nav-item">
            <a
              className="btn btn-danger"
              ref={loginBtn}
              id="memberspace-login"
              href="https://members.aaliveevents.com/member/sign_in"
            >
              Join Now / Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
