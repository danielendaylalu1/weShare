import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/app.css";
import {
  faCirclePlus,
  faCompass,
  faHome,
  faSearch,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <div className="logo">
          <h2>WeShare</h2>
        </div>
        <div className="nav">
          <a href="">
            <FontAwesomeIcon icon={faHome} /> <span>Home</span>
          </a>
          <a href="">
            <FontAwesomeIcon icon={faCompass} /> <span>explore</span>
          </a>
          <a href="">
            <FontAwesomeIcon icon={faSearch} /> <span>search</span>
          </a>
          <a href="">
            <FontAwesomeIcon icon={faCirclePlus} /> <span>post</span>
          </a>
          <a href="">
            <FontAwesomeIcon icon={faUsers} /> <span>followers</span>
          </a>
        </div>
        <div className="profile">
          <h3>
            <a href="">D</a>
          </h3>
          <a href="">logout</a>
        </div>
      </div>
      <div className="outlet">outlet</div>
      <div className="feed">feed</div>
    </div>
  );
};

export default App;
