import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCompass,
  faHome,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  const navItems = [
    { header: "Home", icon: faHome, link: "/" },
    { header: "Explore", icon: faCompass, link: "/explore" },
    { header: "Search", icon: faSearch, link: "/search" },
    { header: "Post", icon: faCirclePlus, link: "/post" },
    { header: "Followers", icon: faUsers, link: "/followers" },
  ];
  return (
    <div className="navbar navbar-mobile">
      <div className="logo">
        <h2>WeShare</h2>
      </div>
      <div className="nav">
        {navItems.map((item) => {
          return (
            <Link to={item.link} key={item.header}>
              <FontAwesomeIcon icon={item.icon} /> <span>{item.header}</span>
            </Link>
          );
        })}
      </div>
      <div className="profile-navigation">
        <h3>
          <Link to="/profile">D</Link>
        </h3>
        <p className="profile-logout">logout</p>
      </div>
    </div>
  );
};

export default Navbar;
