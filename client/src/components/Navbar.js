import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">StudentMS</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/add" ? "active" : ""}`} to="/add">Add Student</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
