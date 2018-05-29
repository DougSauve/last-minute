import React from 'react';

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

    <div className = "landing__sign-up-modal">
      Welcome to LastMinute! Sign up here.
    </div>

    <SignUpForm
      nameError = {props.nameError}
      emailError = {props.emailError}
      passwordError = {props.passwordError}
      passwordCheckError = {props.passwordCheckError}

      submitError = {props.submitError}
     />

    <div className = "landing__sign-up-modal__submit-button"
      onClick = {props.signUp}
    >
      Sign up
    </div>

    <div className = "landing__sign-up-modal__cancel-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>

  </div>
);

export { SignUpModal as default };
