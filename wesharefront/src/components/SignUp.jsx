import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../services/userservices";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        createUser(user);
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      }}
    >
      <h1>Sign up</h1>
      <div className="form-inputs">
        <div className="input-box">
          <label>Fullname</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => {
              setUser((prv) => ({ ...prv, name: e.target.value }));
            }}
          />
        </div>
        <div className="input-box">
          <label>Username</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => {
              setUser((prv) => ({ ...prv, username: e.target.value }));
            }}
          />
        </div>

        <div className="input-box">
          <label>Phone Number</label>
          <input
            type="number"
            value={user.phoneNumber}
            onChange={(e) => {
              setUser((prv) => ({ ...prv, phoneNumber: e.target.value }));
            }}
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser((prv) => ({ ...prv, password: e.target.value }));
            }}
          />
        </div>
        <div className="input-box">
          <label>Confirm Password</label>
          <input type="password" />
        </div>
      </div>
      <button className="form-btn" type="submit">
        Signup
      </button>
      <div className="navigate">
        <p>or</p>
        <Link to="/signin">Login</Link>
      </div>
    </form>
  );
};

export default SignUp;
