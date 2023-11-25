import { useDispatch, useSelector } from "react-redux";
import "./sign.css";
import { Link } from "react-router-dom";
import { SignInUser } from "../store/userSlice";
import { useState } from "react";
const SignIn = () => {
  const { loading, error } = useSelector((state) => state.ui);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  return (
    <div className="signLayout">
      <h2>Wellcome again</h2>
      <h3>signin</h3>
      {loading ? <p>on proccess</p> : error ? <p>{error}</p> : null}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(SignInUser(user));
        }}
      >
        <div className="sign-form">
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder="username"
              value={user.username}
              onChange={(e) =>
                setUser((prv) => ({ ...prv, username: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="******"
              value={user.password}
              onChange={(e) =>
                setUser((prv) => ({ ...prv, password: e.target.value }))
              }
            />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
          <div className="sign-or-link">
            <span>or</span>
            <Link to="/signup"> Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
