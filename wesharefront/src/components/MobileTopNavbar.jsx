// import React from "react";
import { Link } from "react-router-dom";
import "./mobileTopNavbar.css";
import { useSelector } from "react-redux";

const MobileTopNavbar = () => {
  const user = JSON.parse(useSelector((state) => state.user));
  return (
    <>
      {user ? (
        <div className="mobile-top-nav">
          {console.log(user)}
          <Link to="/">Weshare</Link>
          <Link to="/profile">{user.name && user.name[0]}</Link>
        </div>
      ) : (
        <div className="mobile-top-nav">
          <Link to="/">Weshare</Link>
          <div className="sign-links">
            <Link to="/signin">signin</Link>/<Link to="/signup">signup</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileTopNavbar;
