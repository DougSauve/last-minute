import React from 'react';

const ChangePasswordModal = (props) => (
  // props: {
    // requestPasswordReset = {this.requestPasswordReset}
    // closeModal = {this.closeModal}
    // submitError = {this.props.submitError}
  // }
  <div className = "profile__change-password-modal">
    <form className = "profile__change-password-modal__form">

      <span>Enter current password:</span>
      <input
        className = "profile__change-password-modal__form__password"
        type = "password"
        name = "oldPassword"
      />
      <br />

      <span>Enter new password (must be at least 6 characters long):</span>
      <input
        className = "profile__change-password-modal__form__password"
        type = "password"
        name = "newPassword"
      />
      <br />

      <span>Enter new password again:</span>
      <input
        className = "profile__change-password-modal__form__password"
        type = "password"
        name = "newPasswordCheck"

      />
    </form>

    <span className = "form__error">{props.submitError}</span>

    <div className = "profile__change-password-modal__submit-button"
      onClick = {props.requestPasswordReset}
    >
      Submit
    </div>

    <div className = "profile__change-password-modal__cancel-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>
  </div>
);

export default ChangePasswordModal;
