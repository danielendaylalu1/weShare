import { Link } from "react-router-dom";
import { useState } from "react";
import { signUser } from "../services/userservices";
import { useDispatch } from "react-redux";
import { signInUser } from "../store/user";
const Signin = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleLogin = async (data) => {
    try {
      const userData = await signUser(data);
      window.localStorage.setItem("user", userData);
      setTimeout(() => {
        dispatch(signInUser(userData));
      }, 1000);
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(user);
      }}
    >
      <h1>Login</h1>
      {message && <p>{message}</p>}
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
