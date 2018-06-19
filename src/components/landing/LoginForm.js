import React from 'react';
import './LoginForm.scss';

const LoginForm = (props) => (
  // props: {
  //   submitError = {this.props.submitError}
  //   setShowSignUpModal = {this.setShowSignUpModal}
  //   logIn = {this.logIn}
  // }
  <form className = "landing__log-in-form">

    <span className = "landing__form__error">
      {props.submitError}
    </span>

    <div>
      <span className = "landing__text-style">Email address:</span>
      <input
        className = "landing__log-in__email-input landing__input"
        type = "email"
        name = "email"
      />
    </div>

    <div>
      <span className = "landing__text-style">Password:</span>
      <input
        className = "landing__log-in__password-input landing__input"
        type = "password"
        name = "password"
      />
    </div>

    {/* Log in Button */}
    <div
      className = "landing__log-in-button landing__button"
      onClick = {props.logIn}
    >
      Log in
    </div>

    {/* Sign up Button */}
    <div
      className = "landing__sign-up-button landing__button"
      onClick = {props.setShowSignUpModal}
    >
      Sign up
    </div>

  </form>
);

export default LoginForm;
