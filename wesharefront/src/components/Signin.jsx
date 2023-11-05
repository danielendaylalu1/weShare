import { Link } from "react-router-dom";
import { useState } from "react";
import { signUser } from "../services/userservices";
const Signin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        signUser(user);
      }}
    >
      <h1>Login</h1>
      <div className="form-inputs">
        <div className="input-box">
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => {
              setUser((prv) => ({ ...prv, username: e.target.value }));
            }}
          />
        </div>

        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setUser((prv) => ({ ...prv, password: e.target.value }));
            }}
          />
        </div>
      </div>
      <button className="form-btn" type="submit">
        Login
      </button>
      <div className="navigate">
        <p>or</p>
        <Link to="/signup">Sign up</Link>
      </div>
    </form>
  );
};

export default Signin;
