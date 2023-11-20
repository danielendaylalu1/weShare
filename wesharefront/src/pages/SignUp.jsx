import "./sign.css";
const SignUp = () => {
  return (
    <div className="signLayout">
      <h2>Wellcome again</h2>
      <h3>SignUp</h3>
      <form className="form">
        <div className="sign-form">
          <div>
            <label>Full name</label>
            <input type="email" placeholder="full name" />
          </div>
          <div>
            <label>Username</label>
            <input type="email" placeholder="user name" />
          </div>
          <div>
            <label>Phone number</label>
            <input type="email" placeholder="096635****" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="******" />
          </div>

          <div>
            <button type="submit">Sign up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
