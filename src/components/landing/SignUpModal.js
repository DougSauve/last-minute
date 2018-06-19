import React from 'react';
import './SignUpModal.scss';

import SignUpForm from './SignUpForm';

const SignUpModal = (props) => (
  // props {
  //   signUp = {this.signUp}
  //   closeModal = {this.closeModal}
  //   nameError = {this.props.nameError}
  //   emailError = {this.props.emailError}
  //   passwordError = {this.props.passwordError}
  //   passwordCheckError = {this.props.passwordCheckError}
  // }
  <div className = "landing__sign-up-modal">

    <div className = "landing__sign-up-modal__greeting">
      Welcome to LastMinute.<br />
      Let's get you connected.
    </div>

    <SignUpForm
      nameError = {props.nameError}
      emailError = {props.emailError}
      passwordError = {props.passwordError}
      passwordCheckError = {props.passwordCheckError}

      submitError = {props.submitError}
     />

    <div className = "landing__sign-up-modal__button-container">
      <div className = "landing__sign-up-modal__button green-color"
        onClick = {props.signUp}
      >
        Sign up
      </div>

      <div className = "landing__sign-up-modal__button blue-color"
        onClick = {props.closeModal}
      >
        Cancel
      </div>
    </div>

  </div>
);

export { SignUpModal as default };
