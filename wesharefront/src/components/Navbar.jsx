import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCompass,
  faHome,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../store/userSlice";
const Navbar = () => {
  const navItems = [
    { header: "Home", icon: faHome, link: "/" },
    { header: "Explore", icon: faCompass, link: "/explore" },
    { header: "Search", icon: faSearch, link: "/search" },
    { header: "Post", icon: faCirclePlus, link: "/post" },
    { header: "Followers", icon: faUsers, link: "/followers" },
  ];
  const user = JSON.parse(useSelector((state) => state.user));

  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <div className="navbar navbar-mobile">
      <div className="logo">
        <h2>
          <Link to="/">WeShare</Link>
        </h2>
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
      {user ? (
        <div className="profile-navigation">
          <h3>
            {console.log(user)}
            <Link to="/profile">{user.name[0]}</Link>
          </h3>
          <p
            className="profile-logout"
            onClick={() => {
              dispatch(logOutUser(null));
              navigate("/signin");
            }}
          >
            logout
          </p>
        </div>
      ) : (
        <div className="profile-navigation">
          <h3>
            <Link to="/signin">SIGNIN</Link>
          </h3>
          <Link to="/signup">SIGNUP</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
