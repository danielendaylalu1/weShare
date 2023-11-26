import { Link } from "react-router-dom";
import "./sign.css";

import { useState } from "react";
import { createUser } from "../services/userservices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading } from "../store/uiSlice";

const SignUp = () => {
  const { loading, error } = useSelector((state) => state.ui);
  const [user, setUser] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createNewUser = async (data) => {
    try {
      dispatch(setLoading(true));
      await createUser(data);
      dispatch(setLoading(null));
      dispatch(setError(null));
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(setLoading(null));
      if (error.response) {
        dispatch(
          setError(error.response.data.message || error.response.data.error)
        );
      } else {
        dispatch(setError(error.message));
      }
    }
  };
  return (
    <div className="signLayout">
      <h2>Join and share your moment</h2>
      <h3>SignUp</h3>
      {loading ? (
        <p>on proccess</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : null}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user);
          createNewUser(user);
          setUser({
            name: "",
            username: "",
            phoneNumber: "",
            password: "",
          });
        }}
      >
        <div className="sign-form">
          <div>
            <label>Full name</label>
            <input
              type="text"
              placeholder="full name"
              value={user.name}
              onChange={(e) => {
                setUser((prv) => ({ ...prv, name: e.target.value }));
              }}
            />
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="user name"
              value={user.username}
              onChange={(e) => {
                setUser((prv) => ({ ...prv, username: e.target.value }));
              }}
            />
          </div>
          <div>
            <label>Phone number</label>
            <input
              type="text"
              placeholder="096635****"
              value={user.phoneNumber}
              onChange={(e) => {
                setUser((prv) => ({ ...prv, phoneNumber: e.target.value }));
              }}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="******"
              value={user.password}
              onChange={(e) => {
                setUser((prv) => ({ ...prv, password: e.target.value }));
              }}
            />
          </div>
          <div>
            <label>Confirm password</label>
            <input type="password" placeholder="******" />
          </div>

          <div>
            <button type="submit">Sign up</button>
          </div>
          <div className="sign-or-link">
            <span>or</span>
            <Link to="/signin">Sign in</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
