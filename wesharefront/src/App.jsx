import searchIcon from "./assets/images/search.svg";
import homeIcon from "./assets/images/home.svg";
import exploreIcon from "./assets/images/explore.svg";
import followingIcon from "./assets/images/friends.svg";
import addIcon from "./assets/images/add.svg";
import menuIcon from "./assets/images/menu.svg";
import closeIcon from "./assets/images/close.svg";

import "./styles/app.css";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  const isAuth = true;
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <div className="navbar">
        <Link to="/" className="logo">
          weShare
        </Link>
        <form className="search">
          <button type="submit" className="icon-box">
            <img src={searchIcon} className="search-icon icon" />
          </button>
          <input type="text" className="search-input" />
        </form>
        <div className="menu">
          {showNav ? (
            <div className="menu-icon-box">
              <img
                src={closeIcon}
                className="menu-icon icon"
                onClick={() => {
                  setShowNav(!showNav);
                }}
              />
            </div>
          ) : (
            <div className="menu-icon-box">
              <img
                src={menuIcon}
                className="menu-icon icon"
                onClick={() => {
                  setShowNav(!showNav);
                }}
              />
            </div>
          )}
        </div>
        <div className={`nav ${showNav && "show-nav"}`}>
          <ul className="nav-items">
            <li className="nav-item">
              <Link
                to="/home"
                onClick={() => {
                  setShowNav(false);
                }}
                className="nav-link"
              >
                <div className="icon-box">
                  <img src={homeIcon} className="home-icon icon" />
                </div>

                <span>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/explore"
                onClick={() => {
                  setShowNav(false);
                }}
                className="nav-link"
              >
                <div className="icon-box">
                  <img src={exploreIcon} className="explore-icon icon" />
                </div>
                <span>Explore</span>
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => {
                  setShowNav(false);
                }}
                className="nav-link"
              >
                <div className="icon-box">
                  <img src={addIcon} className="add-icon icon" />
                </div>
                <span>Post</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                onClick={() => {
                  setShowNav(false);
                }}
                className="nav-link"
              >
                <div className="icon-box">
                  <img src={followingIcon} className="following-icon icon" />
                </div>
                <span>Following</span>
              </a>
            </li>
          </ul>
          {isAuth ? (
            <div className="profile">
              <div className="profile-box">
                <div className="profile-pic-box">
                  <a
                    href="#"
                    onClick={() => {
                      setShowNav(false);
                    }}
                  >
                    <img src={followingIcon} className="profile-pic" />
                  </a>
                </div>
                <a
                  href="#"
                  onClick={() => {
                    setShowNav(false);
                  }}
                  className="profile-name"
                >
                  daniel endaylalu
                </a>
              </div>

              <a
                href="#"
                onClick={() => {
                  setShowNav(false);
                }}
                className="logout"
              >
                <span>Logout</span>
              </a>
            </div>
          ) : (
            <div className="sign">
              <a
                href="#"
                onClick={() => {
                  setShowNav(false);
                }}
                className="signin"
              >
                Login
              </a>
              <a
                href="#"
                onClick={() => {
                  setShowNav(false);
                }}
                className="signup"
              >
                Signup
              </a>
            </div>
          )}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
