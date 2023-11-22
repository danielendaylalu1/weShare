import "./styles/app.css";

import Navbar from "./components/Navbar";
import MobileTopNavbar from "./components/MobileTopNavbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useEffect } from "react";
import { initializeUser } from "./store/userSlice";
import { setTocken } from "./services/postservices";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = window.localStorage.getItem("user");
    dispatch(initializeUser(userData));
    if (userData) {
      const userTocken = JSON.parse(userData);
      setTocken(userTocken.tocken);
    }
  }, []);
  return (
    <div className="app">
      <MobileTopNavbar />
      <Navbar />
      <div className="outlet">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<div>explore</div>} />
          <Route path="/search" element={<div>search</div>} />
          <Route
            path="/post"
            element={
              user ? <div>post</div> : <Navigate to="/signin" replace={true} />
            }
          />
          <Route
            path="/followers"
            element={
              user ? (
                <div>followers</div>
              ) : (
                <Navigate to="/signin" replace={true} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <div>profile</div>
              ) : (
                <Navigate to="/signin" replace={true} />
              )
            }
          />
          <Route
            path="/signin"
            element={
              user ? <Navigate to="/profile" replace={true} /> : <SignIn />
            }
          />
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/profile" replace={true} /> : <SignUp />
            }
          />
        </Routes>
      </div>
      <div className="feed">feed</div>
    </div>
  );
};

export default App;
