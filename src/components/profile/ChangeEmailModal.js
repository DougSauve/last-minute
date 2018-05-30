import React from 'react';

const ChangeEmailModal = (props) => (
  // props: {
    // requestEmailReset = {this.requestEmailReset}
    // closeModal = {this.closeModal}
    // submitError = {this.props.submitError}
  // }
  <div className = "profile__change-email-modal">
    <form className = "profile__change-email-modal__form">

      <span>Enter password:</span>
      <input
        className = "profile__change-email-modal__form__password"
        type = "password"
        name = "password"
      />
      <br />

      <span>Enter new email address:</span>
      <input
        className = "profile__change-email-modal__form__newEmail"
        type = "email"
        name = "newEmail"
      />
      <br />

      <span>Enter new email address again:</span>
      <input
        className = "profile__change-password-modal__form__newEmailCheck"
        type = "email"
        name = "newEmailCheck"

      />
    </form>

    <span className = "form__error">{props.submitError}</span>

    <div className = "profile__change-email-modal__submit-button"
      onClick = {props.requestEmailReset}
    >
      Submit
    </div>

    <div className = "profile__change-email-modal__cancel-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>
  </div>
);

export default ChangeEmailModal;
