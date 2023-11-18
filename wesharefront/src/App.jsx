import "./styles/app.css";

import Navbar from "./components/Navbar";
import MobileTopNavbar from "./components/MobileTopNavbar";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="app">
      <MobileTopNavbar />
      <Navbar />
      <div className="outlet">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<div>explore</div>} />
          <Route path="/search" element={<div>search</div>} />
          <Route path="/post" element={<div>post</div>} />
          <Route path="/followers" element={<div>followers</div>} />
          <Route path="/profile" element={<div>profile</div>} />
        </Routes>
      </div>
      <div className="feed">feed</div>
    </div>
  );
};

export default App;
