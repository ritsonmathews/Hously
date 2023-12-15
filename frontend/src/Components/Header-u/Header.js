// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/authContext';


const Header = () => {
  const navigate = useNavigate();
  const { authenticated, user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    // Redirect to the home page or login page after signing out
    navigate('/');
  };

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link to={'/'} className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
          <img className="img-fluid w-10" src="/img/hously.png" style={{ width: 170 }} alt="Hously Logo" />
        </Link>
        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to={'/about'} className="nav-item nav-link">
              About
            </Link>
            <Link to={'/contact'} className="nav-item nav-link">
              Contact
            </Link>

            {authenticated ? (
              // Render these links when the user is authenticated
              <>
                <Link to={`profile/${user._id}`} className="nav-item nav-link">
                  User Profile
                </Link>
                <Link to={'/resume'} className="nav-item nav-link">
                  Resume
                </Link>
                <Link to={'/myjobs'} className="nav-item nav-link">
                  My Jobs
                </Link>
                <Link to={'/reviews'} className="nav-item nav-link">
                  My Reviews
                </Link>
                <Link to={'/notifications'} className="nav-item nav-link">
                  Notifications
                </Link>
                <button onClick={handleSignOut} className="btn btn-link nav-item nav-link">
                  Sign Out
                </button>
              </>
            ) : (
              // Render these links when the user is not authenticated
              <>
                <Link to={'/login'} className="nav-item nav-link">
                  Sign In
                </Link>
              </>
            )}
          </div>
          <Link to={'/jobposting'} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">
            Post A Job<i className="fa fa-arrow-right ms-3"></i>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
