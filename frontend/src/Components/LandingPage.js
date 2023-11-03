import React from "react";
import "./LandingPage.css";

export const LandingPage = () => {
  return (
    <div className="container-fluid landingPage">
      <header className="header-banner">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-4 mt-4">
              <a className="login-signup-link" href="/login">
                Login
              </a>
              <span className="mx-3 text-black">|</span>
              <a className="login-signup-link" href="/signup">
                Signup
              </a>
            </div>
          </div>
          <h1 className="mt-5">Welcome to Hously</h1>
          <p className="lead">Find the best handyman jobs near you</p>
        </div>
      </header>
      <section className="mb-5">
        <h2 className="text-center">Search for Jobs</h2>
        <form className="text-center">
          <div
            className="input-group mb-3 mx-auto"
            style={{ maxWidth: "400px" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Enter your location"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
      </section>
      <section className="bg-light py-5 ">
        <h2 className="text-center ">Why Choose Us?</h2>
        <div className="row mt-4">
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <i className="fas fa-hammer fa-3x"></i>
              <p className="mt-3">Skilled Handymen</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <i className="fas fa-tools fa-3x"></i>
              <p className="mt-3">Wide Range of Services</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <i className="fas fa-users fa-3x"></i>
              <p className="mt-3">Connect with Customers</p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-4 mb-4">
        <h2>Get Started Today</h2>
        <p>Sign up and start browsing job listings</p>
        <button className="btn btn-success">Sign Up</button>
      </section>
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>
            <i
              class="fa-brands fa-instagram fa-2x"
              style={{color:"#ffffff"}}
            ></i>&nbsp;&nbsp;
            <i class="fa-brands fa-facebook fa-2x" style={{color:"#ffffff"}}></i> &nbsp;&nbsp;
            <i
              class="fa-brands fa-square-x-twitter fa-2x"
              style={{color:"#ffffff"}}
            ></i>
          </p>
          <p>&copy; 2023 Handyman Jobs. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
