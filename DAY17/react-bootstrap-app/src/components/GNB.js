import React from "react";
import { Link } from "react-router-dom";

const GNB = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/signin">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign up
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/articles">
                Article
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default GNB;
