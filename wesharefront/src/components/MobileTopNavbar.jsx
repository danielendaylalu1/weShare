// import React from "react";
import { Link } from "react-router-dom";
import "./mobileTopNavbar.css";

const MobileTopNavbar = () => {
  return (
    <div className="mobile-top-nav">
      <Link to="/">Weshare</Link>
      <Link to="/profile">D</Link>
    </div>
  );
};

export default MobileTopNavbar;
