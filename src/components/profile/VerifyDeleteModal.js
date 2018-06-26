import React from 'react';

const VerifyDeleteModal = (props) => (
  // props {
  // submitError = {this.props.submitError}
  // deleteProfile = {this.deleteProfile}
  // closeModal = {this.closeModal}
  // }
  <div className = "modal-padding center">

    <div className = "warning">Are you sure you want to delete your profile? This cannot be undone.</div>

    <span className = "error">{props.submitError}</span>

    <div className = "button-container">
      <div className = "button width15 background-red"
        onClick = {props.deleteProfile}
      >
        Delete
      </div>

      <div className = "button width15 background-none"
        onClick = {props.closeModal}
      >
        Cancel
      </div>
    </div>

  </div>
);

export { VerifyDeleteModal as default };
