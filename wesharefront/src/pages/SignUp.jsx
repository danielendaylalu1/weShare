import { Link } from "react-router-dom";
import "./sign.css";

import { useState } from "react";
import { createUser } from "../services/userservices";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const createNewUser = async (data) => {
    try {
      await createUser(data);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signLayout">
      <h2>Join and share your moment</h2>
      <h3>SignUp</h3>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(user);
          createNewUser(user);
          setUser({
            fullname: "",
            username: "",
            phonenumber: "",
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
              value={user.fullname}
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
