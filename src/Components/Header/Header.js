import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to={"/"}
          class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
        >
          <img
            class="img-fluid w-10"
            src="/img/hously.png"
            style={{ width: 200 }}
          />
        </Link>
        <button
          type="button"
          class="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto p-4 p-lg-0">
            <Link to={"/"} class="nav-item nav-link">Home</Link>
            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                User
              </a>
              <div class="dropdown-menu rounded-0 m-0">
                <Link to={"/profile"} class="dropdown-item">
                  User Profile
                </Link>

                <Link to={"/resume"} class="dropdown-item">
                  Resume
                </Link>
                <Link to={"/reviews"} class="dropdown-item">
                  My Reviews
                </Link>
                <Link to={"/myjobs"} class="dropdown-item">
                  My Jobs
                </Link>
              </div>
            </div>
            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div class="dropdown-menu rounded-0 m-0">
              <Link to={"/jobs"} class="dropdown-item">
                 Jobs
                </Link>
              </div>
            </div>
            <Link to={"/contact"} class="nav-item nav-link">
              Contact
            </Link>
            <Link to={"/about"} class="nav-item nav-link">
              About
            </Link>
          </div>
          <Link
           to={"/jobposting"}
            class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
          >
            Post A Job<i class="fa fa-arrow-right ms-3"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
