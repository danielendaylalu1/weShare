import "./sign.css";
import { Link } from "react-router-dom";
const SignIn = () => {
  return (
    <div className="signLayout">
      <h2>Wellcome again</h2>
      <h3>signin</h3>
      <form className="form">
        <div className="sign-form">
          <div>
            <label>Username</label>
            <input type="email" placeholder="name@example.com" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="******" />
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
