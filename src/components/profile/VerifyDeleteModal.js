import React from 'react';

const VerifyDeleteModal = (props) => (
  // props {
  //   deleteProfile: ()
  //   closeModal: ()
  // }
  <div className = "profile__verify-delete-modal">

    <div className = "profile__verify-delete-modal__message">
      Are you sure you want to delete your profile? This cannot be undone.
    </div>

    <div className = "profile__verify-delete-modal__submit-button"
      onClick = {props.deleteProfile}
    >
      Delete
    </div>

    <div className = "profile__verify-delete-modal__cancel-button"
      onClick = {props.closeModal}
    >
      Cancel
    </div>

  </div>
);

export { VerifyDeleteModal as default };
