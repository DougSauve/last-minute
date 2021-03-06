import React from 'react';
import './LoginForm.scss';

const LoginForm = (props) => (
  // props: {
  //   submitError = {this.props.submitError}
  //   setShowSignUpModal = {this.setShowSignUpModal}
  //   logIn = {this.logIn}
  // }
  <form className = "landing__log-in-form">

    <span className = "error">
      {props.submitError}
    </span>

    <div className = "center">
      <span className = "landing__text-style">Email address:</span>
      <input
        className = "input width15"
        type = "email"
        name = "email"
        autoFocus
      />

      <span className = "landing__text-style">Password:</span>
      <input
        className = "input width15"
        type = "password"
        name = "password"
      />

      {/* Log in Button */}
      <div
        className = "button background-blue width15"
        onClick = {props.logIn}
      >
        Log in
      </div>

      {/* Sign up Button */}
      <div
        className = "button background-green width15"
        onClick = {props.setShowSignUpModal}
      >
        Sign up
      </div>
    </div>


  </form>
);

export default LoginForm;
