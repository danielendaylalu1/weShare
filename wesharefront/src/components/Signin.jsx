import { Link } from "react-router-dom";
const Signin = () => {
  return (
    <form className="form">
      <h1>Login</h1>
      <div className="form-inputs">
        <div className="input-box">
          <label>Username</label>
          <input type="text" />
        </div>

        <div className="input-box">
          <label>Password</label>
          <input type="password" />
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
