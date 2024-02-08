import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { Header } from "./Header";
import { useContext } from "react";
import  UserContext  from "../contexts/UserContext";

export const Navigation = () => {

  const { currentUser } = useContext(UserContext)
  const auth = localStorage.getItem('currentUser')
  const navigate = useNavigate()
 

  function logout() {
    if (auth) {
      localStorage.clear()
      navigate('/users')
  }
  
}




  const handleToggle = (event) => {
    event.preventDefault();
    const menu = document.getElementById("navbarBasicExample");
    menu.classList.toggle("is-active");
  };

  return (
    <div>
      <nav
        style={{
          position: "fixed",
          width: "100%",
          top: "0",
          backgroundColor: "rgb(35, 35, 35)",
          borderBottom: "2px solid orange",
        }}
        className="navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <Header />
          </Link>
          <Link
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={handleToggle}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div
          id="navbarBasicExample"
          className="navbar-menu"
          style={{
            backgroundColor: "rgb(35, 35, 35)",
          }}
        >
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Topics
            </Link>

            <Link className="navbar-item" to="/">
              Articles
            </Link>
            <Link className="navbar-item" to="/">
              Detail Page
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <Link className="navbar-link">More</Link>
              <div
                className="navbar-dropdown"
                style={{
                  backgroundColor: "rgb(35, 35, 35)",
                }}
              >
                <Link className="navbar-item">About</Link>
                <Link className="navbar-item">Jobs</Link>
                <Link className="navbar-item">Contact</Link>
                <hr className="navbar-divider" />
                <Link className="navbar-item">Report an issue</Link>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {auth ? (
                  <>
                    <div >
                      <p className="user-name navbar-item" style={{color:'#fff'}}>
                        <img src={currentUser.avatar_url} alt="" />
                        {currentUser.username}
                      </p>
                    </div>
                    <Link
                      onClick={logout}
                      to="/users"
                      className="button is-light login-button"
                      style={{ backgroundColor: "orange", color: "#fff" }}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/users"
                    className="button is-light login-button"
                    style={{ backgroundColor: "orange", color: "#fff" }}
                  >
                    Login
                  </Link>
                )}
                {/* <a className="button is-primary">
                  <strong>Sign up</strong>
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
