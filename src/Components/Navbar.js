import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Budget Tracker</h1>
      </div>
      <div className="logout">
        <Link to="/signin">Logout</Link> {/* Logout Link */}
      </div>
    </nav>
  );
};

export default Navbar;
