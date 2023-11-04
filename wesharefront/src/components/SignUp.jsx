import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <form className="form">
      <h1>Sign up</h1>
      <div className="form-inputs">
        <div className="input-box">
          <label>Fullname</label>
          <input type="text" />
        </div>
        <div className="input-box">
          <label>Username</label>
          <input type="text" />
        </div>
        <div className="input-box">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="input-box">
          <label>Phone Number</label>
          <input type="number" />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input type="password" />
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
