// import React from "react";
import { Link } from "react-router-dom";
import "./mobileTopNavbar.css";
import { useSelector } from "react-redux";

const MobileTopNavbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user ? (
        <div className="mobile-top-nav">
          <Link to="/">Weshare</Link>
          <Link to="/profile">D</Link>
        </div>
      ) : (
        <div className="mobile-top-nav">
          <Link to="/">Weshare</Link>
          <Link to="/signin">signin</Link>
        </div>
      )}
    </>
  );
};

export default MobileTopNavbar;
