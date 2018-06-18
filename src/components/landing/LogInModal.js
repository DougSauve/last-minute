import React from 'react';

const LogInModal = (props) => (
  // props {
  //   logIn = {this.logIn}
  //   closeModal = {this.closeModal}/>
  //   submitError = {this.props.submitError}
  // }
  <div className = "landing__log-in-modal">

    <div className = "landing__log-in-modal">
      Welcome to LastMinute! Log in here.
    </div>

    <form className = "landing__logIn-form">
      <span className = "landing__form__error">
        {props.submitError}
      </span>

      <span>Email address:</span>
      <input
        className = "landing__logIn-form__email"
        type = "email"
        name = "email"
      />
      {/* <span className = "landing__form__error">
        {props.emailError}
      </span> */}
      <br />

      <span>Password:</span>
      <input
        className = "landing__logIn-form__password"
        type = "password"
        name = "password"
      />
      {/* <span className = "landing__form__error">
        {props.passwordError}
      </span> */}
      <br />
    </form>

    <div className = "landing__log-in-modal__submit-button"
      onClick = {props.logIn}
    >
      Log in
    </div>

    <div className = "landing__log-in-modal__cancel-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>

  </div>
);

export { LogInModal as default };
