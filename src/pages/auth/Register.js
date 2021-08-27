import React, { useState, useEffect } from "react";
import "./register.css";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    if (user && user.token) {
      history.push("/");
    }
  }, [user]);

  //when form submit handleSubmit function invoke
  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email was send to ${email}. 
      Please click the link to complete your registration.`
    );
    //save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);

    //To clear the state
    setEmail("");
  };

  //registration form function
  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control form-control-inline"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
