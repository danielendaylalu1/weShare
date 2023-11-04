/* eslint-disable react/prop-types */
import "../styles/signpage.css";
const SignPage = ({ children }) => {
  return (
    <div className="container">
      <div className="sign-page">
        <div className="headers">
          <h1>we</h1>
          <h1>Share</h1>
        </div>
        <div className="sign-form">{children}</div>
      </div>
    </div>
  );
};

export default SignPage;
