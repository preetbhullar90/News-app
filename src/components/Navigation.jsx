import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import { Header } from "./Header";

export const Navigation = () => {
  const handleToggle = () => {
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
          <a
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
          </a>
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
              <a className="navbar-link">More</a>
              <div
                className="navbar-dropdown"
                style={{
                  backgroundColor: "rgb(35, 35, 35)",
                }}
              >
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* <a className="button is-primary">
                  <strong>Sign up</strong>
                </a> */}
                <Link
                  className="button is-light login-button"
                  style={{ backgroundColor: "orange", color: "#fff" }}
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
