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
  <div className = "modal-item-container">

    <div className = "header-modal">
      <div className = "size2">
        Welcome to LastMinute. Let's get you connected.
      </div>
    </div>

    <SignUpForm
      nameError = {props.nameError}
      emailError = {props.emailError}
      passwordError = {props.passwordError}
      passwordCheckError = {props.passwordCheckError}

      submitError = {props.submitError}
     />

    <div className = "button-container">
      <div className = "button background-green width15"
        onClick = {props.signUp}
      >
        Sign up
      </div>

      <div className = "button background-none width15"
        onClick = {props.closeModal}
      >
        Cancel
      </div>
    </div>

  </div>
);

export { SignUpModal as default };
