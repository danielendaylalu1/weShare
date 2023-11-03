import searchIcon from "./assets/images/search.svg";
import homeIcon from "./assets/images/home.svg";
import exploreIcon from "./assets/images/explore.svg";
import followingIcon from "./assets/images/friends.svg";
import addIcon from "./assets/images/add.svg";

import "./styles/app.css";

function App() {
  const isAuth = false;
  return (
    <>
      <div className="navbar">
        <a href="#" className="logo">
          Logo
        </a>
        <form className="search">
          <div className="icon-box">
            <img src={searchIcon} className="search-icon icon" />
          </div>
          <input type="text" className="search-input" />
        </form>
        <div className="nav">
          <ul className="nav-items">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <div className="icon-box">
                  <img src={homeIcon} className="home-icon icon" />
                </div>

                <span>Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <div className="icon-box">
                  <img src={exploreIcon} className="explore-icon icon" />
                </div>
                <span>Explore</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <div className="icon-box">
                  <img src={addIcon} className="add-icon icon" />
                </div>
                <span>Post</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <div className="icon-box">
                  <img src={followingIcon} className="following-icon icon" />
                </div>
                <span>Following</span>
              </a>
            </li>
          </ul>
        </div>
        {isAuth ? (
          <div className="profile">
            <div className="profile-box">
              <div className="profile-pic-box">
                <img src={followingIcon} className="profile-pic" />
              </div>
              <a href="#" className="profile-name">
                daniel endaylalu
              </a>
            </div>

            <a href="#" className="logout">
              <span>Logout</span>
            </a>
          </div>
        ) : (
          <div className="sign">
            <a href="#" className="signin">
              Login
            </a>
            <a href="#" className="signup">
              Signup
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
