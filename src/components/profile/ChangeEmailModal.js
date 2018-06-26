import React from 'react';

const ChangeEmailModal = (props) => (
  // props: {
    // requestEmailReset = {this.requestEmailReset}
    // closeModal = {this.closeModal}
    // submitError = {this.props.submitError}
  // }
  <div className = "modal-padding center">
    <div className = "header">
      <div className = "size2">
        Change your email address
      </div>
    </div>

    <div className = "modal-item-container">
      <form className = "profile__change-email-modal__form profile-spacing">

        <div className = "property">
          <div className = "key--no-length width15">Password:</div>
          <div className = "value">
            <input
              className = "input"
              type = "password"
              name = "password"
            />
          </div>
        </div>

        <div className = "property">
          <div className = "key--no-length width15">New email address:</div>
          <div className = "value">
            <input
              className = "input"
              type = "email"
              name = "newEmail"
            />
          </div>
        </div>

        <div className = "property">
          <div className = "key--no-length width15">New email address again:</div>
          <div className = "value">
            <input
              className = "input"
              type = "email"
              name = "newEmailCheck"
            />
          </div>
        </div>
      </form>

    </div>

    <span className = "error">{props.submitError}</span>

    <div className = "button-container">
      <div className = "button width15 background-green"
        onClick = {props.requestEmailReset}
      >
        Submit
      </div>

      <div className = "button width15 background-none"
        onClick = {props.closeModal}
      >
        Cancel
      </div>
    </div>

  </div>
);

export default ChangeEmailModal;
