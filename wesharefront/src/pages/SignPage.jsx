/* eslint-disable react/prop-types */
import { getUsers } from "../services/userservices";
import "../styles/signpage.css";
import { useEffect } from "react";
const SignPage = ({ children }) => {
  useEffect(() => {
    getUsers();
  }, []);
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
