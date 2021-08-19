import React, { useState, useEffect } from "react";
import "./register.css";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //use effect hook grabs email from local storage and populate it in email input field.
  //use effect hook runs when component mount.
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  //when form submit handleSubmit function invoke
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation for password
    if (!email || !password) {
      toast.error("Email and password is required.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be  at least 6 characters long.");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );

      if (result.user.emailVerified) {
        //Remove email from local storage
        window.localStorage.removeItem("emailForRegistration");
        //Get user ID token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        //Populate user in redix store

        //Redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //registration form function
  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control form-control-inline"
        value={email}
        disabled
      />
      <br />
      <input
        type="password"
        className="form-control form-control-inline"
        value={password}
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-primary">
        Complete Your Registeration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
